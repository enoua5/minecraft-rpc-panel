import type { MCMP, JsonRpcMessage } from "../mcmp.d.mts";
import { IdCounter } from "./id-counter.js";

export class RpcRequestHandler {
    requests: { [id: number]: (result: any) => void } = {};
    listeners: {
        [method: string]: ((params: JsonRpcMessage["params"]) => void)[];
    } = {};
    id_counter: IdCounter = new IdCounter();
    socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
        this.socket.onmessage = this.#handleSocketMessage.bind(this);
    }

    #handleSocketMessage(e: WebSocketEventMap["message"]) {
        const data: JsonRpcMessage = JSON.parse(e.data);

        if (data.method?.match(/^\w+:notification/)) {
            const listeners = this.listeners[data.method] ?? [];
            for (const listener of listeners) {
                listener(data.params);
            }
        } else if (data.id) {
            const resolve = this.requests[data.id];
            if (resolve) {
                resolve(data.result);
            }
            delete this.requests[data.id];
        }
    }

    /**
     * Make a request to the Minecraft RPC
     */
    async makeRpcRequest(method: string, params?: object) {
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

    addEventListener(
        method: string,
        callback: (params: JsonRpcMessage["params"]) => void
    ) {
        if (!this.listeners[method]) {
            this.listeners[method] = [];
        }
        this.listeners[method].push(callback);
    }

    removeEventListener(
        method: string,
        callback: (params: JsonRpcMessage["params"]) => void
    ) {
        this.listeners[method] = (this.listeners[method] ?? []).filter(
            (c) => c !== callback
        );
    }

    async discover(): Promise<MCMP.DiscoverResponse> {
        return await this.makeRpcRequest("rpc.discover");
    }
}
