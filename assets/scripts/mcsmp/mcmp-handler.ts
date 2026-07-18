import type {
    MinecraftMethodName,
    MinecraftNotificationMethodName,
    MinecraftNotifications,
    MinecraftRequests,
} from "./mcmp.d.mts";
import { RpcCallback, RpcRequestHandler } from "./rpc-request-handler";

export class MinecraftServerManagementClient extends RpcRequestHandler<
    MinecraftMethodName,
    MinecraftRequests,
    MinecraftNotificationMethodName,
    MinecraftNotifications
> {
    // ---------------------------------------------------------------------
    // rpc.discover
    // ---------------------------------------------------------------------
    async discover(): Promise<MinecraftRequests["rpc.discover"]["response"]> {
        return await this.makeRpcRequest("rpc.discover");
    }

    // ---------------------------------------------------------------------
    // Allowlist
    // ---------------------------------------------------------------------
    async getAllowList(): Promise<
        MinecraftRequests["minecraft:allowlist"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:allowlist");
    }

    async setAllowList(
        ...params: MinecraftRequests["minecraft:allowlist/set"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:allowlist/set"]["response"]> {
        return await this.makeRpcRequest("minecraft:allowlist/set", ...params);
    }

    async addAllowListEntries(
        ...params: MinecraftRequests["minecraft:allowlist/add"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:allowlist/add"]["response"]> {
        return await this.makeRpcRequest("minecraft:allowlist/add", ...params);
    }

    async removeAllowListEntries(
        ...params: MinecraftRequests["minecraft:allowlist/remove"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:allowlist/remove"]["response"]> {
        return await this.makeRpcRequest(
            "minecraft:allowlist/remove",
            ...params
        );
    }

    async clearAllowList(): Promise<
        MinecraftRequests["minecraft:allowlist/clear"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:allowlist/clear");
    }

    // ---------------------------------------------------------------------
    // Bans
    // ---------------------------------------------------------------------
    async getBans(): Promise<MinecraftRequests["minecraft:bans"]["response"]> {
        return await this.makeRpcRequest("minecraft:bans");
    }

    async setBans(
        ...params: MinecraftRequests["minecraft:bans/set"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:bans/set"]["response"]> {
        return await this.makeRpcRequest("minecraft:bans/set", ...params);
    }

    async addBans(
        ...params: MinecraftRequests["minecraft:bans/add"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:bans/add"]["response"]> {
        return await this.makeRpcRequest("minecraft:bans/add", ...params);
    }

    async removeBans(
        ...params: MinecraftRequests["minecraft:bans/remove"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:bans/remove"]["response"]> {
        return await this.makeRpcRequest("minecraft:bans/remove", ...params);
    }

    async clearBans(): Promise<
        MinecraftRequests["minecraft:bans/clear"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:bans/clear");
    }

    // ---------------------------------------------------------------------
    // IP Bans
    // ---------------------------------------------------------------------
    async getIpBans(): Promise<
        MinecraftRequests["minecraft:ip_bans"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:ip_bans");
    }

    async setIpBans(
        ...params: MinecraftRequests["minecraft:ip_bans/set"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:ip_bans/set"]["response"]> {
        return await this.makeRpcRequest("minecraft:ip_bans/set", ...params);
    }

    async addIpBans(
        ...params: MinecraftRequests["minecraft:ip_bans/add"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:ip_bans/add"]["response"]> {
        return await this.makeRpcRequest("minecraft:ip_bans/add", ...params);
    }

    async removeIpBans(
        ...params: MinecraftRequests["minecraft:ip_bans/remove"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:ip_bans/remove"]["response"]> {
        return await this.makeRpcRequest("minecraft:ip_bans/remove", ...params);
    }

    async clearIpBans(): Promise<
        MinecraftRequests["minecraft:ip_bans/clear"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:ip_bans/clear");
    }

    // ---------------------------------------------------------------------
    // Players
    // ---------------------------------------------------------------------
    async getPlayers(): Promise<
        MinecraftRequests["minecraft:players"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:players");
    }

    async kickPlayers(
        ...params: MinecraftRequests["minecraft:players/kick"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:players/kick"]["response"]> {
        return await this.makeRpcRequest("minecraft:players/kick", ...params);
    }

    // ---------------------------------------------------------------------
    // Operators
    // ---------------------------------------------------------------------
    async getOperators(): Promise<
        MinecraftRequests["minecraft:operators"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:operators");
    }

    async setOperators(
        ...params: MinecraftRequests["minecraft:operators/set"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:operators/set"]["response"]> {
        return await this.makeRpcRequest("minecraft:operators/set", ...params);
    }

    async addOperators(
        ...params: MinecraftRequests["minecraft:operators/add"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:operators/add"]["response"]> {
        return await this.makeRpcRequest("minecraft:operators/add", ...params);
    }

    async removeOperators(
        ...params: MinecraftRequests["minecraft:operators/remove"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:operators/remove"]["response"]> {
        return await this.makeRpcRequest(
            "minecraft:operators/remove",
            ...params
        );
    }

    async clearOperators(): Promise<
        MinecraftRequests["minecraft:operators/clear"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:operators/clear");
    }

    // ---------------------------------------------------------------------
    // Server
    // ---------------------------------------------------------------------
    async getServerStatus(): Promise<
        MinecraftRequests["minecraft:server/status"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:server/status");
    }

    async saveServer(
        ...params: MinecraftRequests["minecraft:server/save"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:server/save"]["response"]> {
        return await this.makeRpcRequest("minecraft:server/save", ...params);
    }

    async stopServer(): Promise<
        MinecraftRequests["minecraft:server/stop"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:server/stop");
    }

    async sendSystemMessage(
        ...params: MinecraftRequests["minecraft:server/system_message"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:server/system_message"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:server/system_message",
            ...params
        );
    }

    // ---------------------------------------------------------------------
    // Server Settings
    // ---------------------------------------------------------------------
    async getAutosave(): Promise<
        MinecraftRequests["minecraft:serversettings/autosave"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:serversettings/autosave");
    }

    async setAutosave(
        ...params: MinecraftRequests["minecraft:serversettings/autosave/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/autosave/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/autosave/set",
            ...params
        );
    }

    async getDifficulty(): Promise<
        MinecraftRequests["minecraft:serversettings/difficulty"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:serversettings/difficulty");
    }

    async setDifficulty(
        ...params: MinecraftRequests["minecraft:serversettings/difficulty/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/difficulty/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/difficulty/set",
            ...params
        );
    }

    async getEnforceAllowlist(): Promise<
        MinecraftRequests["minecraft:serversettings/enforce_allowlist"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/enforce_allowlist"
        );
    }

    async setEnforceAllowlist(
        ...params: MinecraftRequests["minecraft:serversettings/enforce_allowlist/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/enforce_allowlist/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/enforce_allowlist/set",
            ...params
        );
    }

    async getUseAllowlist(): Promise<
        MinecraftRequests["minecraft:serversettings/use_allowlist"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/use_allowlist"
        );
    }

    async setUseAllowlist(
        ...params: MinecraftRequests["minecraft:serversettings/use_allowlist/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/use_allowlist/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/use_allowlist/set",
            ...params
        );
    }

    async getMaxPlayers(): Promise<
        MinecraftRequests["minecraft:serversettings/max_players"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/max_players"
        );
    }

    async setMaxPlayers(
        ...params: MinecraftRequests["minecraft:serversettings/max_players/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/max_players/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/max_players/set",
            ...params
        );
    }

    async getPauseWhenEmptySeconds(): Promise<
        MinecraftRequests["minecraft:serversettings/pause_when_empty_seconds"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/pause_when_empty_seconds"
        );
    }

    async setPauseWhenEmptySeconds(
        ...params: MinecraftRequests["minecraft:serversettings/pause_when_empty_seconds/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/pause_when_empty_seconds/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/pause_when_empty_seconds/set",
            ...params
        );
    }

    async getPlayerIdleTimeout(): Promise<
        MinecraftRequests["minecraft:serversettings/player_idle_timeout"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/player_idle_timeout"
        );
    }

    async setPlayerIdleTimeout(
        ...params: MinecraftRequests["minecraft:serversettings/player_idle_timeout/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/player_idle_timeout/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/player_idle_timeout/set",
            ...params
        );
    }

    async getAllowFlight(): Promise<
        MinecraftRequests["minecraft:serversettings/allow_flight"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/allow_flight"
        );
    }

    async setAllowFlight(
        ...params: MinecraftRequests["minecraft:serversettings/allow_flight/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/allow_flight/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/allow_flight/set",
            ...params
        );
    }

    async getMotd(): Promise<
        MinecraftRequests["minecraft:serversettings/motd"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:serversettings/motd");
    }

    async setMotd(
        ...params: MinecraftRequests["minecraft:serversettings/motd/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/motd/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/motd/set",
            ...params
        );
    }

    async getSpawnProtectionRadius(): Promise<
        MinecraftRequests["minecraft:serversettings/spawn_protection_radius"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/spawn_protection_radius"
        );
    }

    async setSpawnProtectionRadius(
        ...params: MinecraftRequests["minecraft:serversettings/spawn_protection_radius/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/spawn_protection_radius/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/spawn_protection_radius/set",
            ...params
        );
    }

    async getForceGameMode(): Promise<
        MinecraftRequests["minecraft:serversettings/force_game_mode"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/force_game_mode"
        );
    }

    async setForceGameMode(
        ...params: MinecraftRequests["minecraft:serversettings/force_game_mode/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/force_game_mode/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/force_game_mode/set",
            ...params
        );
    }

    async getGameMode(): Promise<
        MinecraftRequests["minecraft:serversettings/game_mode"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:serversettings/game_mode");
    }

    async setGameMode(
        ...params: MinecraftRequests["minecraft:serversettings/game_mode/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/game_mode/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/game_mode/set",
            ...params
        );
    }

    async getViewDistance(): Promise<
        MinecraftRequests["minecraft:serversettings/view_distance"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/view_distance"
        );
    }

    async setViewDistance(
        ...params: MinecraftRequests["minecraft:serversettings/view_distance/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/view_distance/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/view_distance/set",
            ...params
        );
    }

    async getSimulationDistance(): Promise<
        MinecraftRequests["minecraft:serversettings/simulation_distance"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/simulation_distance"
        );
    }

    async setSimulationDistance(
        ...params: MinecraftRequests["minecraft:serversettings/simulation_distance/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/simulation_distance/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/simulation_distance/set",
            ...params
        );
    }

    async getAcceptTransfers(): Promise<
        MinecraftRequests["minecraft:serversettings/accept_transfers"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/accept_transfers"
        );
    }

    async setAcceptTransfers(
        ...params: MinecraftRequests["minecraft:serversettings/accept_transfers/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/accept_transfers/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/accept_transfers/set",
            ...params
        );
    }

    async getStatusHeartbeatInterval(): Promise<
        MinecraftRequests["minecraft:serversettings/status_heartbeat_interval"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/status_heartbeat_interval"
        );
    }

    async setStatusHeartbeatInterval(
        ...params: MinecraftRequests["minecraft:serversettings/status_heartbeat_interval/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/status_heartbeat_interval/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/status_heartbeat_interval/set",
            ...params
        );
    }

    async getOperatorUserPermissionLevel(): Promise<
        MinecraftRequests["minecraft:serversettings/operator_user_permission_level"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/operator_user_permission_level"
        );
    }

    async setOperatorUserPermissionLevel(
        ...params: MinecraftRequests["minecraft:serversettings/operator_user_permission_level/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/operator_user_permission_level/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/operator_user_permission_level/set",
            ...params
        );
    }

    async getHideOnlinePlayers(): Promise<
        MinecraftRequests["minecraft:serversettings/hide_online_players"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/hide_online_players"
        );
    }

    async setHideOnlinePlayers(
        ...params: MinecraftRequests["minecraft:serversettings/hide_online_players/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/hide_online_players/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/hide_online_players/set",
            ...params
        );
    }

    async getStatusReplies(): Promise<
        MinecraftRequests["minecraft:serversettings/status_replies"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/status_replies"
        );
    }

    async setStatusReplies(
        ...params: MinecraftRequests["minecraft:serversettings/status_replies/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/status_replies/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/status_replies/set",
            ...params
        );
    }

    async getEntityBroadcastRange(): Promise<
        MinecraftRequests["minecraft:serversettings/entity_broadcast_range"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/entity_broadcast_range"
        );
    }

    async setEntityBroadcastRange(
        ...params: MinecraftRequests["minecraft:serversettings/entity_broadcast_range/set"]["request_params"]
    ): Promise<
        MinecraftRequests["minecraft:serversettings/entity_broadcast_range/set"]["response"]
    > {
        return await this.makeRpcRequest(
            "minecraft:serversettings/entity_broadcast_range/set",
            ...params
        );
    }

    // ---------------------------------------------------------------------
    // Gamerules
    // ---------------------------------------------------------------------
    async getGamerules(): Promise<
        MinecraftRequests["minecraft:gamerules"]["response"]
    > {
        return await this.makeRpcRequest("minecraft:gamerules");
    }

    async updateGamerules(
        ...params: MinecraftRequests["minecraft:gamerules/update"]["request_params"]
    ): Promise<MinecraftRequests["minecraft:gamerules/update"]["response"]> {
        return await this.makeRpcRequest(
            "minecraft:gamerules/update",
            ...params
        );
    }

    // ---------------------------------------------------------------------
    // Console
    // ---------------------------------------------------------------------
    async runCommand(
        ...params: MinecraftRequests["console:send"]["request_params"]
    ): Promise<MinecraftRequests["console:send"]["response"]> {
        return await this.makeRpcRequest("console:send", ...params);
    }

    // =======================================================================
    // Notifications
    // =======================================================================

    // --- server/started ---
    addServerStartedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/started"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/server/started",
            callback
        );
    }

    removeServerStartedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/started"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/server/started",
            callback
        );
    }

    // --- server/stopping ---
    addServerStoppingListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/stopping"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/server/stopping",
            callback
        );
    }

    removeServerStoppingListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/stopping"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/server/stopping",
            callback
        );
    }

    // --- server/saving ---
    addServerSavingListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/saving"]
        >
    ) {
        this.addEventListener("minecraft:notification/server/saving", callback);
    }

    removeServerSavingListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/saving"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/server/saving",
            callback
        );
    }

    // --- server/saved ---
    addServerSavedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/saved"]
        >
    ) {
        this.addEventListener("minecraft:notification/server/saved", callback);
    }

    removeServerSavedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/saved"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/server/saved",
            callback
        );
    }

    // --- server/activity ---
    addServerActivityListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/activity"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/server/activity",
            callback
        );
    }

    removeServerActivityListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/activity"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/server/activity",
            callback
        );
    }

    // --- server/status ---
    addServerStatusListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/status"]
        >
    ) {
        this.addEventListener("minecraft:notification/server/status", callback);
    }

    removeServerStatusListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/server/status"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/server/status",
            callback
        );
    }

    // --- players/joined ---
    addPlayerJoinedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/players/joined"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/players/joined",
            callback
        );
    }

    removePlayerJoinedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/players/joined"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/players/joined",
            callback
        );
    }

    // --- players/left ---
    addPlayerLeftListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/players/left"]
        >
    ) {
        this.addEventListener("minecraft:notification/players/left", callback);
    }

    removePlayerLeftListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/players/left"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/players/left",
            callback
        );
    }

    // --- operators/added ---
    addOperatorAddedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/operators/added"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/operators/added",
            callback
        );
    }

    removeOperatorAddedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/operators/added"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/operators/added",
            callback
        );
    }

    // --- operators/removed ---
    addOperatorRemovedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/operators/removed"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/operators/removed",
            callback
        );
    }

    removeOperatorRemovedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/operators/removed"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/operators/removed",
            callback
        );
    }

    // --- allowlist/added ---
    addAllowListAddedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/allowlist/added"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/allowlist/added",
            callback
        );
    }

    removeAllowListAddedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/allowlist/added"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/allowlist/added",
            callback
        );
    }

    // --- allowlist/removed ---
    addAllowListRemovedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/allowlist/removed"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/allowlist/removed",
            callback
        );
    }

    removeAllowListRemovedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/allowlist/removed"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/allowlist/removed",
            callback
        );
    }

    // --- ip_bans/added ---
    addIpBanAddedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/ip_bans/added"]
        >
    ) {
        this.addEventListener("minecraft:notification/ip_bans/added", callback);
    }

    removeIpBanAddedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/ip_bans/added"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/ip_bans/added",
            callback
        );
    }

    // --- ip_bans/removed ---
    addIpBanRemovedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/ip_bans/removed"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/ip_bans/removed",
            callback
        );
    }

    removeIpBanRemovedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/ip_bans/removed"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/ip_bans/removed",
            callback
        );
    }

    // --- bans/added ---
    addBanAddedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/bans/added"]
        >
    ) {
        this.addEventListener("minecraft:notification/bans/added", callback);
    }

    removeBanAddedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/bans/added"]
        >
    ) {
        this.removeEventListener("minecraft:notification/bans/added", callback);
    }

    // --- bans/removed ---
    addBanRemovedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/bans/removed"]
        >
    ) {
        this.addEventListener("minecraft:notification/bans/removed", callback);
    }

    removeBanRemovedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/bans/removed"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/bans/removed",
            callback
        );
    }

    // --- gamerules/updated ---
    addGameRuleUpdatedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/gamerules/updated"]
        >
    ) {
        this.addEventListener(
            "minecraft:notification/gamerules/updated",
            callback
        );
    }

    removeGameRuleUpdatedListener(
        callback: RpcCallback<
            MinecraftNotifications["minecraft:notification/gamerules/updated"]
        >
    ) {
        this.removeEventListener(
            "minecraft:notification/gamerules/updated",
            callback
        );
    }

    // --- console:log/event ---
    addLogEventListener(
        callback: RpcCallback<
            MinecraftNotifications["console:notification/log/event"]
        >
    ) {
        this.addEventListener("console:notification/log/event", callback);
    }

    removeLogEventListener(
        callback: RpcCallback<
            MinecraftNotifications["console:notification/log/event"]
        >
    ) {
        this.removeEventListener("console:notification/log/event", callback);
    }
}
