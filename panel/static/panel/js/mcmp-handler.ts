import type {
    MinecraftMethodName,
    MinecraftNotificationMethodName,
    MinecraftNotifications,
    MinecraftRequests,
} from "./mcmp.d.mts";
import { RpcCallback, RpcRequestHandler } from "./rpc-request-handler.js";

export class MinecraftServerManagementClient extends RpcRequestHandler<
    MinecraftMethodName,
    MinecraftRequests,
    MinecraftNotificationMethodName,
    MinecraftNotifications
> {
    async discover() {
        return await this.makeRpcRequest("rpc.discover");
    }

    async getAllowList() {
        return await this.makeRpcRequest("minecraft:allowlist");
    }

    async setAllowList(
        params: MinecraftRequests["minecraft:allowlist"]["request_params"]
    ) {
        return await this.makeRpcRequest("minecraft:allowlist/set", params);
    }

    addPlayerJoinedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/players/joined"]["params"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/players/joined",
            callback
        );
    }

    removePlayerJoinedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/players/joined"]["params"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/players/joined",
            callback
        );
    }
}
