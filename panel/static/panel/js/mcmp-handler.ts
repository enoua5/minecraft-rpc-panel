import type { MCSMP } from "./mcmp.d.mts";
import { RpcCallback, RpcRequestHandler } from "./rpc-request-handler.js";

export class MinecraftServerManagementClient extends RpcRequestHandler<
    MCSMP.MinecraftMethodName,
    MCSMP.MinecraftRequests,
    MCSMP.MinecraftNotificationMethodName,
    MCSMP.MinecraftNotifications
> {
    async discover() {
        return await this.makeRpcRequest("rpc.discover");
    }

    async getAllowList() {
        return await this.makeRpcRequest("minecraft:allowlist");
    }

    async setAllowList(params: MCSMP.AllowlistSetParams) {
        return await this.makeRpcRequest("minecraft:allowlist/set", params);
    }

    addPlayerJoinedListener(
        callback: RpcCallback<[MCSMP.PlayerNotificationParams]>
    ) {
        this.addEventListener(
            "minecraft:notification/players/joined",
            callback
        );
    }

    removePlayerJoinedListener(
        callback: RpcCallback<[MCSMP.PlayerNotificationParams]>
    ) {
        this.removeEventListener(
            "minecraft:notification/players/joined",
            callback
        );
    }
}
