import type { MCMP } from "../mcmp.d.mts";
import { IdCounter } from "./id-counter.js";

export class RpcRequestHandler {
    requests: { [id: number]: (result: any) => void } = {};
    id_counter: IdCounter = new IdCounter();
    socket: WebSocket;

    constructor(socket: WebSocket) {
        this.socket = socket;
        this.socket.onmessage = this.#handleSocketMessage.bind(this);
    }

    #handleSocketMessage(e: WebSocketEventMap["message"]) {
        const data = JSON.parse(e.data);
        const id = data.id;
        const resolve = this.requests[id];
        if(resolve) {
            resolve(data.result)
        }
        delete this.requests[id];
    }

    /**
     * Make a request to the Minecraft RPC
     */
    async makeRpcRequest(
        method: string,
        params?: object,
    ) {
        const id = this.id_counter.id;

        const promise = new Promise<any>(resolve => { this.requests[id] = resolve });

        this.socket.send(JSON.stringify({
            jsonrpc: "2.0",
            id,
            method,
            params,
        }));

        return promise;
    }

    async discover(): Promise<MCMP.DiscoverResponse> {
        return await this.makeRpcRequest("rpc.discover")
    }
}