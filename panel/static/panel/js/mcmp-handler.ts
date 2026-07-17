import type { MCSMP } from "./mcmp.d.mts";
import { RpcRequestHandler } from "./rpc-request-handler.js";

export class MinecraftServerManagementClient extends RpcRequestHandler {
    async discover(): Promise<MCSMP.DiscoverResponse> {
        return await this.makeRpcRequest("rpc.discover");
    }
}
