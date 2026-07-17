import type { JsonRpcMessage, JsonRpcNotification } from "./rpc.d.mts";
import { IdCounter } from "./id-counter.js";

export class RpcRequestHandler {
    private requests: { [id: number]: (result: any) => void } = {};
    private listeners: {
        [method: string]: ((params: JsonRpcNotification["params"]) => void)[];
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

        if (data.id) {
            const resolve = this.requests[data.id];
            if (resolve) {
                resolve(data.result);
            }
            delete this.requests[data.id];
        } else if (data.method) {
            const listeners = this.listeners[data.method] ?? [];
            for (const listener of listeners) {
                try {
                    listener(data.params);
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
    public async makeRpcRequest(method: string, params?: object) {
        const id = this.id_counter.id;

        const promise = new Promise<any>((resolve) => {
            this.requests[id] = resolve;
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

    public addEventListener(
        method: string,
        callback: (...params: JsonRpcNotification["params"]) => void
    ) {
        if (!this.listeners[method]) {
            this.listeners[method] = [];
        }
        this.listeners[method].push(callback);
    }

    public removeEventListener(
        method: string,
        callback: (...params: JsonRpcNotification["params"]) => void
    ) {
        this.listeners[method] = (this.listeners[method] ?? []).filter(
            (c) => c !== callback
        );
    }
}
