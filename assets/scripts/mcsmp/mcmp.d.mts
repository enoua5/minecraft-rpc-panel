import type {
    JsonRpcNotification,
    JsonRpcRequest,
    JsonRpcSuccessResponse,
} from "./rpc.d.mts";

export type DiscoverPropertyValue =
    | {
          $ref: string;
      }
    | {
          type: "string";
          enum?: string[];
      }
    | {
          type: "array";
          items: DiscoverPropertyValue;
      }
    | {
          type: "boolean";
      }
    | {
          type: "integer";
      }
    | {
          type: "object";
          properties: {
              [fieldName: string]: DiscoverPropertyValue;
          };
      };

export type DiscoverMethod = {
    name: string;
    description: string;
    params: {
        name: string;
        schema: DiscoverPropertyValue;
        required: boolean;
    }[];
    result: {
        name: string;
        schema: DiscoverPropertyValue;
    };
};

export type DiscoverResponse = {
    components: {
        schemas: {
            [schemaName: string]: DiscoverPropertyValue;
        };
    };
    info: {
        title: string;
        version: string;
    };
    methods: DiscoverMethod[];
};

export type Player =
    | {
          name?: string;
          id: string;
      }
    | {
          name: string;
          id?: string;
      };

export interface Version {
    protocol: number;
    name: string;
}

export interface ServerState {
    players?: Player[];
    started: boolean;
    version: Version;
}

export type GameType = "survival" | "creative" | "adventure" | "spectator";

export type Difficulty = "peaceful" | "easy" | "normal" | "hard";

export interface Message {
    translatable?: string;
    translatableParams?: string[];
    literal?: string;
}

export interface SystemMessage {
    receivingPlayers?: Player[];
    overlay: boolean;
    message: Message;
}

export interface KickPlayer {
    message?: Message;
    player: Player;
}

export interface Operator {
    permissionLevel?: number;
    bypassesPlayerLimit?: boolean;
    player: Player;
}

export interface UserBan {
    reason?: string;
    expires?: string;
    source?: string;
    player: Player;
}

export interface IpBan {
    reason?: string;
    expires?: string;
    ip: string;
    source?: string;
}

export interface IncomingIpBan {
    reason?: string;
    expires?: string;
    ip?: string;
    source?: string;
    player?: Player;
}

export type GameRuleValue = boolean | number;

export interface UntypedGameRule {
    value: GameRuleValue;
    key: string;
}

export interface TypedGameRule {
    type: "integer" | "boolean";
    value: GameRuleValue;
    key: string;
}

export interface ConsoleLogEvent {
    timestamp: string;
    level: string;
    logger: string;
    message: string;
    thread: string;
    throwable: string;
}

// --- minecraft:allowlist ---
export type AllowlistResult = Player[];

export type AllowlistSetParams = [Player[]];
export type AllowlistSetResult = Player[];

export type AllowlistAddParams = [Player[]];
export type AllowlistAddResult = Player[];

export type AllowlistRemoveParams = [Player[]];
export type AllowlistRemoveResult = Player[];

export type AllowlistClearResult = Player[];

// --- minecraft:bans ---
export type BansResult = UserBan[];

export type BansSetParams = [UserBan[]];
export type BansSetResult = UserBan[];

export type BansAddParams = [UserBan[]];
export type BansAddResult = UserBan[];

export type BansRemoveParams = [Player[]];
export type BansRemoveResult = UserBan[];

export type BansClearResult = UserBan[];

// --- minecraft:ip_bans ---
export type IpBansResult = IpBan[];

export type IpBansSetParams = [IpBan[]];
export type IpBansSetResult = IpBan[];

export type IpBansAddParams = [IncomingIpBan[]];
export type IpBansAddResult = IpBan[];

export type IpBansRemoveParams = [string[]];
export type IpBansRemoveResult = IpBan[];

export type IpBansClearResult = IpBan[];

// --- minecraft:players ---
export type PlayersResult = Player[];

export type PlayersKickParams = [KickPlayer[]];
export type PlayersKickResult = Player[];

// --- minecraft:operators ---
export type OperatorsResult = Operator[];

export type OperatorsSetParams = [Operator[]];
export type OperatorsSetResult = Operator[];

export type OperatorsAddParams = [Operator[]];
export type OperatorsAddResult = Operator[];

export type OperatorsRemoveParams = [Player[]];
export type OperatorsRemoveResult = Operator[];

export type OperatorsClearResult = Operator[];

// --- minecraft:server ---
export type ServerStatusResult = ServerState;

export type ServerSaveParams = [boolean];
export type ServerSaveResult = boolean;

export type ServerStopResult = boolean;

export type ServerSystemMessageParams = [SystemMessage];
export type ServerSystemMessageResult = boolean;

// --- minecraft:serversettings ---
export type ServerSettingsAutosaveResult = boolean;
export type ServerSettingsAutosaveSetParams = [boolean];
export type ServerSettingsAutosaveSetResult = boolean;

export type ServerSettingsDifficultyResult = Difficulty;
export type ServerSettingsDifficultySetParams = [Difficulty];
export type ServerSettingsDifficultySetResult = Difficulty;

export type ServerSettingsEnforceAllowlistResult = boolean;
export type ServerSettingsEnforceAllowlistSetParams = [boolean];
export type ServerSettingsEnforceAllowlistSetResult = boolean;

export type ServerSettingsUseAllowlistResult = boolean;
export type ServerSettingsUseAllowlistSetParams = [boolean];
export type ServerSettingsUseAllowlistSetResult = boolean;

export type ServerSettingsMaxPlayersResult = number;
export type ServerSettingsMaxPlayersSetParams = [number];
export type ServerSettingsMaxPlayersSetResult = number;

export type ServerSettingsPauseWhenEmptySecondsResult = number;
export type ServerSettingsPauseWhenEmptySecondsSetParams = [number];
export type ServerSettingsPauseWhenEmptySecondsSetResult = number;

export type ServerSettingsPlayerIdleTimeoutResult = number;
export type ServerSettingsPlayerIdleTimeoutSetParams = [number];
export type ServerSettingsPlayerIdleTimeoutSetResult = number;

export type ServerSettingsAllowFlightResult = boolean;
export type ServerSettingsAllowFlightSetParams = [boolean];
export type ServerSettingsAllowFlightSetResult = boolean;

export type ServerSettingsMotdResult = string;
export type ServerSettingsMotdSetParams = [string];
export type ServerSettingsMotdSetResult = string;

export type ServerSettingsSpawnProtectionRadiusResult = number;
export type ServerSettingsSpawnProtectionRadiusSetParams = [number];
export type ServerSettingsSpawnProtectionRadiusSetResult = number;

export type ServerSettingsForceGameModeResult = boolean;
export type ServerSettingsForceGameModeSetParams = [boolean];
export type ServerSettingsForceGameModeSetResult = boolean;

export type ServerSettingsGameModeResult = GameType;
export type ServerSettingsGameModeSetParams = [GameType];
export type ServerSettingsGameModeSetResult = GameType;

export type ServerSettingsViewDistanceResult = number;
export type ServerSettingsViewDistanceSetParams = [number];
export type ServerSettingsViewDistanceSetResult = number;

export type ServerSettingsSimulationDistanceResult = number;
export type ServerSettingsSimulationDistanceSetParams = [number];
export type ServerSettingsSimulationDistanceSetResult = number;

export type ServerSettingsAcceptTransfersResult = boolean;
export type ServerSettingsAcceptTransfersSetParams = [boolean];
export type ServerSettingsAcceptTransfersSetResult = boolean;

export type ServerSettingsStatusHeartbeatIntervalResult = number;
export type ServerSettingsStatusHeartbeatIntervalSetParams = [number];
export type ServerSettingsStatusHeartbeatIntervalSetResult = number;

export type ServerSettingsOperatorUserPermissionLevelResult = number;
export type ServerSettingsOperatorUserPermissionLevelSetParams = [number];
export type ServerSettingsOperatorUserPermissionLevelSetResult = number;

export type ServerSettingsHideOnlinePlayersResult = boolean;
export type ServerSettingsHideOnlinePlayersSetParams = [boolean];
export type ServerSettingsHideOnlinePlayersSetResult = boolean;

export type ServerSettingsStatusRepliesResult = boolean;
export type ServerSettingsStatusRepliesSetParams = [boolean];
export type ServerSettingsStatusRepliesSetResult = boolean;

export type ServerSettingsEntityBroadcastRangeResult = number;
export type ServerSettingsEntityBroadcastRangeSetParams = [number];
export type ServerSettingsEntityBroadcastRangeSetResult = number;

// --- minecraft:gamerules ---
export type GamerulesResult = TypedGameRule[];

export type GamerulesUpdateParams = [UntypedGameRule];
export type GamerulesUpdateResult = TypedGameRule;

// --- console:send ---
export type ConsoleSendParams = [
    {
        command: string;
    },
];
export type ConsoleSendResult = {
    command: string;
    result?: string;
    success: boolean;
};

export interface MinecraftNotifications {
    "minecraft:notification/server/started": [];
    "minecraft:notification/server/stopping": [];
    "minecraft:notification/server/saving": [];
    "minecraft:notification/server/saved": [];
    "minecraft:notification/server/activity": [];
    "minecraft:notification/players/joined": [Player];
    "minecraft:notification/players/left": [Player];
    "minecraft:notification/operators/added": [Operator];
    "minecraft:notification/operators/removed": [Operator];
    "minecraft:notification/allowlist/added": [Player];
    "minecraft:notification/allowlist/removed": [Player];
    "minecraft:notification/ip_bans/added": [IpBan];
    "minecraft:notification/ip_bans/removed": [string];
    "minecraft:notification/bans/added": [UserBan];
    "minecraft:notification/bans/removed": [Player];
    "minecraft:notification/gamerules/updated": [TypedGameRule];
    "minecraft:notification/server/status": [ServerState];
    // https://modrinth.com/mod/msmp-console
    "console:notification/log/event": [ConsoleLogEvent];
}

export type MinecraftNotificationMethodName = keyof MinecraftNotifications;

export type MinecraftRpcNotification<
    M extends MinecraftNotificationMethodName,
> = JsonRpcNotification<M, MinecraftNotifications[M]>;

export interface MinecraftRequests {
    "rpc.discover": {
        request_params: [];
        response: DiscoverResponse;
    };
    "minecraft:allowlist": {
        request_params: [];
        response: AllowlistResult;
    };
    "minecraft:allowlist/set": {
        request_params: AllowlistSetParams;
        response: AllowlistSetResult;
    };
    "minecraft:allowlist/add": {
        request_params: AllowlistAddParams;
        response: AllowlistAddResult;
    };
    "minecraft:allowlist/remove": {
        request_params: AllowlistRemoveParams;
        response: AllowlistRemoveResult;
    };
    "minecraft:allowlist/clear": {
        request_params: [];
        response: AllowlistClearResult;
    };

    "minecraft:bans": { request_params: []; response: BansResult };
    "minecraft:bans/set": {
        request_params: BansSetParams;
        response: BansSetResult;
    };
    "minecraft:bans/add": {
        request_params: BansAddParams;
        response: BansAddResult;
    };
    "minecraft:bans/remove": {
        request_params: BansRemoveParams;
        response: BansRemoveResult;
    };
    "minecraft:bans/clear": {
        request_params: [];
        response: BansClearResult;
    };

    "minecraft:ip_bans": {
        request_params: [];
        response: IpBansResult;
    };
    "minecraft:ip_bans/set": {
        request_params: IpBansSetParams;
        response: IpBansSetResult;
    };
    "minecraft:ip_bans/add": {
        request_params: IpBansAddParams;
        response: IpBansAddResult;
    };
    "minecraft:ip_bans/remove": {
        request_params: IpBansRemoveParams;
        response: IpBansRemoveResult;
    };
    "minecraft:ip_bans/clear": {
        request_params: [];
        response: IpBansClearResult;
    };

    "minecraft:players": {
        request_params: [];
        response: PlayersResult;
    };
    "minecraft:players/kick": {
        request_params: PlayersKickParams;
        response: PlayersKickResult;
    };

    "minecraft:operators": {
        request_params: [];
        response: OperatorsResult;
    };
    "minecraft:operators/set": {
        request_params: OperatorsSetParams;
        response: OperatorsSetResult;
    };
    "minecraft:operators/add": {
        request_params: OperatorsAddParams;
        response: OperatorsAddResult;
    };
    "minecraft:operators/remove": {
        request_params: OperatorsRemoveParams;
        response: OperatorsRemoveResult;
    };
    "minecraft:operators/clear": {
        request_params: [];
        response: OperatorsClearResult;
    };

    "minecraft:server/status": {
        request_params: [];
        response: ServerStatusResult;
    };
    "minecraft:server/save": {
        request_params: ServerSaveParams;
        response: ServerSaveResult;
    };
    "minecraft:server/stop": {
        request_params: [];
        response: ServerStopResult;
    };
    "minecraft:server/system_message": {
        request_params: ServerSystemMessageParams;
        response: ServerSystemMessageResult;
    };

    "minecraft:serversettings/autosave": {
        request_params: [];
        response: ServerSettingsAutosaveResult;
    };
    "minecraft:serversettings/autosave/set": {
        request_params: ServerSettingsAutosaveSetParams;
        response: ServerSettingsAutosaveSetResult;
    };
    "minecraft:serversettings/difficulty": {
        request_params: [];
        response: ServerSettingsDifficultyResult;
    };
    "minecraft:serversettings/difficulty/set": {
        request_params: ServerSettingsDifficultySetParams;
        response: ServerSettingsDifficultySetResult;
    };
    "minecraft:serversettings/enforce_allowlist": {
        request_params: [];
        response: ServerSettingsEnforceAllowlistResult;
    };
    "minecraft:serversettings/enforce_allowlist/set": {
        request_params: ServerSettingsEnforceAllowlistSetParams;
        response: ServerSettingsEnforceAllowlistSetResult;
    };
    "minecraft:serversettings/use_allowlist": {
        request_params: [];
        response: ServerSettingsUseAllowlistResult;
    };
    "minecraft:serversettings/use_allowlist/set": {
        request_params: ServerSettingsUseAllowlistSetParams;
        response: ServerSettingsUseAllowlistSetResult;
    };
    "minecraft:serversettings/max_players": {
        request_params: [];
        response: ServerSettingsMaxPlayersResult;
    };
    "minecraft:serversettings/max_players/set": {
        request_params: ServerSettingsMaxPlayersSetParams;
        response: ServerSettingsMaxPlayersSetResult;
    };
    "minecraft:serversettings/pause_when_empty_seconds": {
        request_params: [];
        response: ServerSettingsPauseWhenEmptySecondsResult;
    };
    "minecraft:serversettings/pause_when_empty_seconds/set": {
        request_params: ServerSettingsPauseWhenEmptySecondsSetParams;
        response: ServerSettingsPauseWhenEmptySecondsSetResult;
    };
    "minecraft:serversettings/player_idle_timeout": {
        request_params: [];
        response: ServerSettingsPlayerIdleTimeoutResult;
    };
    "minecraft:serversettings/player_idle_timeout/set": {
        request_params: ServerSettingsPlayerIdleTimeoutSetParams;
        response: ServerSettingsPlayerIdleTimeoutSetResult;
    };
    "minecraft:serversettings/allow_flight": {
        request_params: [];
        response: ServerSettingsAllowFlightResult;
    };
    "minecraft:serversettings/allow_flight/set": {
        request_params: ServerSettingsAllowFlightSetParams;
        response: ServerSettingsAllowFlightSetResult;
    };
    "minecraft:serversettings/motd": {
        request_params: [];
        response: ServerSettingsMotdResult;
    };
    "minecraft:serversettings/motd/set": {
        request_params: ServerSettingsMotdSetParams;
        response: ServerSettingsMotdSetResult;
    };
    "minecraft:serversettings/spawn_protection_radius": {
        request_params: [];
        response: ServerSettingsSpawnProtectionRadiusResult;
    };
    "minecraft:serversettings/spawn_protection_radius/set": {
        request_params: ServerSettingsSpawnProtectionRadiusSetParams;
        response: ServerSettingsSpawnProtectionRadiusSetResult;
    };
    "minecraft:serversettings/force_game_mode": {
        request_params: [];
        response: ServerSettingsForceGameModeResult;
    };
    "minecraft:serversettings/force_game_mode/set": {
        request_params: ServerSettingsForceGameModeSetParams;
        response: ServerSettingsForceGameModeSetResult;
    };
    "minecraft:serversettings/game_mode": {
        request_params: [];
        response: ServerSettingsGameModeResult;
    };
    "minecraft:serversettings/game_mode/set": {
        request_params: ServerSettingsGameModeSetParams;
        response: ServerSettingsGameModeSetResult;
    };
    "minecraft:serversettings/view_distance": {
        request_params: [];
        response: ServerSettingsViewDistanceResult;
    };
    "minecraft:serversettings/view_distance/set": {
        request_params: ServerSettingsViewDistanceSetParams;
        response: ServerSettingsViewDistanceSetResult;
    };
    "minecraft:serversettings/simulation_distance": {
        request_params: [];
        response: ServerSettingsSimulationDistanceResult;
    };
    "minecraft:serversettings/simulation_distance/set": {
        request_params: ServerSettingsSimulationDistanceSetParams;
        response: ServerSettingsSimulationDistanceSetResult;
    };
    "minecraft:serversettings/accept_transfers": {
        request_params: [];
        response: ServerSettingsAcceptTransfersResult;
    };
    "minecraft:serversettings/accept_transfers/set": {
        request_params: ServerSettingsAcceptTransfersSetParams;
        response: ServerSettingsAcceptTransfersSetResult;
    };
    "minecraft:serversettings/status_heartbeat_interval": {
        request_params: [];
        response: ServerSettingsStatusHeartbeatIntervalResult;
    };
    "minecraft:serversettings/status_heartbeat_interval/set": {
        request_params: ServerSettingsStatusHeartbeatIntervalSetParams;
        response: ServerSettingsStatusHeartbeatIntervalSetResult;
    };
    "minecraft:serversettings/operator_user_permission_level": {
        request_params: [];
        response: ServerSettingsOperatorUserPermissionLevelResult;
    };
    "minecraft:serversettings/operator_user_permission_level/set": {
        request_params: ServerSettingsOperatorUserPermissionLevelSetParams;
        response: ServerSettingsOperatorUserPermissionLevelSetResult;
    };
    "minecraft:serversettings/hide_online_players": {
        request_params: [];
        response: ServerSettingsHideOnlinePlayersResult;
    };
    "minecraft:serversettings/hide_online_players/set": {
        request_params: ServerSettingsHideOnlinePlayersSetParams;
        response: ServerSettingsHideOnlinePlayersSetResult;
    };
    "minecraft:serversettings/status_replies": {
        request_params: [];
        response: ServerSettingsStatusRepliesResult;
    };
    "minecraft:serversettings/status_replies/set": {
        request_params: ServerSettingsStatusRepliesSetParams;
        response: ServerSettingsStatusRepliesSetResult;
    };
    "minecraft:serversettings/entity_broadcast_range": {
        request_params: [];
        response: ServerSettingsEntityBroadcastRangeResult;
    };
    "minecraft:serversettings/entity_broadcast_range/set": {
        request_params: ServerSettingsEntityBroadcastRangeSetParams;
        response: ServerSettingsEntityBroadcastRangeSetResult;
    };

    "minecraft:gamerules": {
        request_params: [];
        response: GamerulesResult;
    };
    "minecraft:gamerules/update": {
        request_params: GamerulesUpdateParams;
        response: GamerulesUpdateResult;
    };
    // https://modrinth.com/mod/msmp-console
    "console:send": {
        request_params: ConsoleSendParams;
        response: ConsoleSendResult;
    };
}

export type MinecraftMethodName = keyof MinecraftRequests;

export type MinecraftRpcRequest<M extends MinecraftMethodName> = JsonRpcRequest<
    M,
    MinecraftRequests[M]["request_params"]
>;

export type MinecraftRpcSuccessResponse<M extends MinecraftMethodName> =
    JsonRpcSuccessResponse<MinecraftRequests[M]["response"]>;
