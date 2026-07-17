import type {
    JsonRpcMessage,
    JsonRpcErrorObject,
} from "./rpc.d.mts";
import { IdCounter } from "./id-counter.js";

export class RpcError extends Error {
    original: JsonRpcErrorObject;
    code: number;
    data: unknown;

    constructor(err: JsonRpcErrorObject) {
        super(err.message);
        this.original = err;
        this.code = err.code;
        this.data = err.data;
    }
}

export type RpcCallback<Params extends unknown[] | undefined> = (
    ...params: NonNullable<Params>
) => void;

export class RpcRequestHandler<
    RequestMethodName extends string = string,
    RequestMapping extends {
        [name in RequestMethodName]: {
            request_params: unknown;
            response: unknown;
        };
    } = {
        [name in RequestMethodName]: {
            request_params: unknown;
            response: unknown;
        };
    },
    NotificationMethodName extends string = string,
    NotificationMapping extends {
        [name in NotificationMethodName]: {
            params: unknown[] | undefined;
        };
    } = {
        [name in NotificationMethodName]: {
            params: unknown[] | undefined;
        };
    },
> {
    private requests: {
        [id: number]: [(result: any) => void, (error: any) => void];
    } = {};
    private listeners: {
        [method: string]: RpcCallback<any>[];
    } = {};
    private id_counter: IdCounter = new IdCounter();
    private socket: WebSocket;

    constructor(
        url: string,
        options?: {
            onOpen?: null | ((event: WebSocketEventMap["open"]) => void);
            onClose?: null | ((event: WebSocketEventMap["close"]) => void);
        }
    ) {
        this.socket = new WebSocket(url);
        this.socket.onmessage = this.handleSocketMessage.bind(this);
        this.socket.onopen = options?.onOpen ?? null;
        this.socket.onclose = options?.onClose ?? null;
    }

    private handleSocketMessage(e: WebSocketEventMap["message"]) {
        const data: JsonRpcMessage = JSON.parse(e.data);

        if (data.error) {
            if (typeof data.id === "number") {
                const [_, reject] = this.requests[data.id];
                if (reject) {
                    reject(new RpcError(data.error));
                }
                delete this.requests[data.id];
            } else {
                console.error(data.error);
            }
        } else if (data.id != null) {
            const [resolve] = this.requests[data.id];
            if (resolve) {
                resolve(data.result);
            }
            delete this.requests[data.id];
        } else if (data.method) {
            const listeners = this.listeners[data.method] ?? [];
            for (const listener of listeners) {
                try {
                    listener(...(data.params ?? []));
                } catch (err) {
                    console.error(err);
                    continue;
                }
            }
        }
    }

    /**
     * Make a request to the Minecraft RPC
     */
    public async makeRpcRequest<Method extends RequestMethodName>(
        method: Method,
        params?: RequestMapping[Method]["request_params"]
    ): Promise<RequestMapping[Method]["response"]> {
        const id = this.id_counter.id;

        const promise = new Promise<any>((resolve, reject) => {
            this.requests[id] = [resolve, reject];
        });

        this.socket.send(
            JSON.stringify({
                jsonrpc: "2.0",
                id,
                method,
                params,
            })
        );

        return promise;
    }

    public addEventListener<Method extends NotificationMethodName>(
        method: Method,
        callback: RpcCallback<NotificationMapping[Method]["params"]>
    ) {
        if (!this.listeners[method]) {
            this.listeners[method] = [];
        }
        this.listeners[method].push(callback);
    }

    public removeEventListener<Method extends NotificationMethodName>(
        method: Method,
        callback: RpcCallback<NotificationMapping[Method]["params"]>
    ) {
        this.listeners[method] = (this.listeners[method] ?? []).filter(
            (c) => c !== callback
        );
    }
}
