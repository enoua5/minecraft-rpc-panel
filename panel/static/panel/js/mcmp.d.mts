import type {
    JsonRpcNotification,
    JsonRpcRequest,
    JsonRpcSuccessResponse,
} from "./rpc.d.mts";

export namespace MCSMP {
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

    export interface Player {
        name?: string;
        id?: string;
    }

    export interface Version {
        protocol?: number;
        name?: string;
    }

    export interface ServerState {
        players?: Player[];
        started?: boolean;
        version?: Version;
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
        overlay?: boolean;
        message?: Message;
    }

    export interface KickPlayer {
        message?: Message;
        player?: Player;
    }

    export interface Operator {
        permissionLevel?: number;
        bypassesPlayerLimit?: boolean;
        player?: Player;
    }

    export interface UserBan {
        reason?: string;
        expires?: string;
        source?: string;
        player?: Player;
    }

    export interface IpBan {
        reason?: string;
        expires?: string;
        ip?: string;
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
        value?: GameRuleValue;
        key?: string;
    }

    export interface TypedGameRule {
        type?: "integer" | "boolean";
        value?: GameRuleValue;
        key?: string;
    }

    // --- minecraft:allowlist ---
    export type AllowlistResult = Player[];

    export interface AllowlistSetParams {
        players: Player[];
    }
    export type AllowlistSetResult = Player[];

    export interface AllowlistAddParams {
        add: Player[];
    }
    export type AllowlistAddResult = Player[];

    export interface AllowlistRemoveParams {
        remove: Player[];
    }
    export type AllowlistRemoveResult = Player[];

    export type AllowlistClearResult = Player[];

    // --- minecraft:bans ---
    export type BansResult = UserBan[];

    export interface BansSetParams {
        bans: UserBan[];
    }
    export type BansSetResult = UserBan[];

    export interface BansAddParams {
        add: UserBan[];
    }
    export type BansAddResult = UserBan[];

    export interface BansRemoveParams {
        remove: Player[];
    }
    export type BansRemoveResult = UserBan[];

    export type BansClearResult = UserBan[];

    // --- minecraft:ip_bans ---
    export type IpBansResult = IpBan[];

    export interface IpBansSetParams {
        banlist: IpBan[];
    }
    export type IpBansSetResult = IpBan[];

    export interface IpBansAddParams {
        add: IncomingIpBan[];
    }
    export type IpBansAddResult = IpBan[];

    export interface IpBansRemoveParams {
        ip: string[];
    }
    export type IpBansRemoveResult = IpBan[];

    export type IpBansClearResult = IpBan[];

    // --- minecraft:players ---
    export type PlayersResult = Player[];

    export interface PlayersKickParams {
        kick: KickPlayer[];
    }
    export type PlayersKickResult = Player[];

    // --- minecraft:operators ---
    export type OperatorsResult = Operator[];

    export interface OperatorsSetParams {
        operators: Operator[];
    }
    export type OperatorsSetResult = Operator[];

    export interface OperatorsAddParams {
        add: Operator[];
    }
    export type OperatorsAddResult = Operator[];

    export interface OperatorsRemoveParams {
        remove: Player[];
    }
    export type OperatorsRemoveResult = Operator[];

    export type OperatorsClearResult = Operator[];

    // --- minecraft:server ---
    export type ServerStatusResult = ServerState;

    export interface ServerSaveParams {
        flush: boolean;
    }
    export type ServerSaveResult = boolean;

    export type ServerStopResult = boolean;

    export interface ServerSystemMessageParams {
        message: SystemMessage;
    }
    export type ServerSystemMessageResult = boolean;

    // --- minecraft:serversettings ---
    export type ServerSettingsAutosaveResult = boolean;
    export interface ServerSettingsAutosaveSetParams {
        enable: boolean;
    }
    export type ServerSettingsAutosaveSetResult = boolean;

    export type ServerSettingsDifficultyResult = Difficulty;
    export interface ServerSettingsDifficultySetParams {
        difficulty: Difficulty;
    }
    export type ServerSettingsDifficultySetResult = Difficulty;

    export type ServerSettingsEnforceAllowlistResult = boolean;
    export interface ServerSettingsEnforceAllowlistSetParams {
        enforce: boolean;
    }
    export type ServerSettingsEnforceAllowlistSetResult = boolean;

    export type ServerSettingsUseAllowlistResult = boolean;
    export interface ServerSettingsUseAllowlistSetParams {
        use: boolean;
    }
    export type ServerSettingsUseAllowlistSetResult = boolean;

    export type ServerSettingsMaxPlayersResult = number;
    export interface ServerSettingsMaxPlayersSetParams {
        max: number;
    }
    export type ServerSettingsMaxPlayersSetResult = number;

    export type ServerSettingsPauseWhenEmptySecondsResult = number;
    export interface ServerSettingsPauseWhenEmptySecondsSetParams {
        seconds: number;
    }
    export type ServerSettingsPauseWhenEmptySecondsSetResult = number;

    export type ServerSettingsPlayerIdleTimeoutResult = number;
    export interface ServerSettingsPlayerIdleTimeoutSetParams {
        seconds: number;
    }
    export type ServerSettingsPlayerIdleTimeoutSetResult = number;

    export type ServerSettingsAllowFlightResult = boolean;
    export interface ServerSettingsAllowFlightSetParams {
        allow: boolean;
    }
    export type ServerSettingsAllowFlightSetResult = boolean;

    export type ServerSettingsMotdResult = string;
    export interface ServerSettingsMotdSetParams {
        message: string;
    }
    export type ServerSettingsMotdSetResult = string;

    export type ServerSettingsSpawnProtectionRadiusResult = number;
    export interface ServerSettingsSpawnProtectionRadiusSetParams {
        radius: number;
    }
    export type ServerSettingsSpawnProtectionRadiusSetResult = number;

    export type ServerSettingsForceGameModeResult = boolean;
    export interface ServerSettingsForceGameModeSetParams {
        force: boolean;
    }
    export type ServerSettingsForceGameModeSetResult = boolean;

    export type ServerSettingsGameModeResult = GameType;
    export interface ServerSettingsGameModeSetParams {
        mode: GameType;
    }
    export type ServerSettingsGameModeSetResult = GameType;

    export type ServerSettingsViewDistanceResult = number;
    export interface ServerSettingsViewDistanceSetParams {
        distance: number;
    }
    export type ServerSettingsViewDistanceSetResult = number;

    export type ServerSettingsSimulationDistanceResult = number;
    export interface ServerSettingsSimulationDistanceSetParams {
        distance: number;
    }
    export type ServerSettingsSimulationDistanceSetResult = number;

    export type ServerSettingsAcceptTransfersResult = boolean;
    export interface ServerSettingsAcceptTransfersSetParams {
        accept: boolean;
    }
    export type ServerSettingsAcceptTransfersSetResult = boolean;

    export type ServerSettingsStatusHeartbeatIntervalResult = number;
    export interface ServerSettingsStatusHeartbeatIntervalSetParams {
        seconds: number;
    }
    export type ServerSettingsStatusHeartbeatIntervalSetResult = number;

    export type ServerSettingsOperatorUserPermissionLevelResult = number;
    export interface ServerSettingsOperatorUserPermissionLevelSetParams {
        level: number;
    }
    export type ServerSettingsOperatorUserPermissionLevelSetResult = number;

    export type ServerSettingsHideOnlinePlayersResult = boolean;
    export interface ServerSettingsHideOnlinePlayersSetParams {
        hide: boolean;
    }
    export type ServerSettingsHideOnlinePlayersSetResult = boolean;

    export type ServerSettingsStatusRepliesResult = boolean;
    export interface ServerSettingsStatusRepliesSetParams {
        enable: boolean;
    }
    export type ServerSettingsStatusRepliesSetResult = boolean;

    export type ServerSettingsEntityBroadcastRangeResult = number;
    export interface ServerSettingsEntityBroadcastRangeSetParams {
        percentage_points: number;
    }
    export type ServerSettingsEntityBroadcastRangeSetResult = number;

    // --- minecraft:gamerules ---
    export type GamerulesResult = TypedGameRule[];

    export interface GamerulesUpdateParams {
        gamerule: UntypedGameRule;
    }
    export type GamerulesUpdateResult = TypedGameRule;

    export interface PlayerNotificationParams {
        player: Player;
    }

    export interface OperatorNotificationParams {
        player: Operator;
    }

    export interface IpBanNotificationParams {
        player: IpBan;
    }

    export interface IpBanRemovedNotificationParams {
        player: string;
    }

    export interface UserBanNotificationParams {
        player: UserBan;
    }

    export interface GameRuleNotificationParams {
        gamerule: TypedGameRule;
    }

    export interface ServerStatusNotificationParams {
        status: ServerState;
    }

    export interface MinecraftNotifications {
        "minecraft:notification/server/started": {
            params: undefined;
        };
        "minecraft:notification/server/stopping": {
            params: undefined;
        };
        "minecraft:notification/server/saving": {
            params: undefined;
        };
        "minecraft:notification/server/saved": {
            params: undefined;
        };
        "minecraft:notification/server/activity": {
            params: undefined;
        };
        "minecraft:notification/players/joined": {
            params: [PlayerNotificationParams];
        };
        "minecraft:notification/players/left": {
            params: [PlayerNotificationParams];
        };
        "minecraft:notification/operators/added": {
            params: [OperatorNotificationParams];
        };
        "minecraft:notification/operators/removed": {
            params: [OperatorNotificationParams];
        };
        "minecraft:notification/allowlist/added": {
            params: [PlayerNotificationParams];
        };
        "minecraft:notification/allowlist/removed": {
            params: [PlayerNotificationParams];
        };
        "minecraft:notification/ip_bans/added": {
            params: [IpBanNotificationParams];
        };
        "minecraft:notification/ip_bans/removed": {
            params: [IpBanRemovedNotificationParams];
        };
        "minecraft:notification/bans/added": {
            params: [UserBanNotificationParams];
        };
        "minecraft:notification/bans/removed": {
            params: [PlayerNotificationParams];
        };
        "minecraft:notification/gamerules/updated": {
            params: [GameRuleNotificationParams];
        };
        "minecraft:notification/server/status": {
            params: [ServerStatusNotificationParams];
        };
    }

    export type MinecraftNotificationMethodName = keyof MinecraftNotifications;

    export type MinecraftRpcNotification<
        M extends MinecraftNotificationMethodName,
    > = JsonRpcNotification<M, MinecraftNotifications[M]["params"]>;

    export interface MinecraftRequests {
        "rpc.discover": {
            request_params: undefined;
            response: DiscoverResponse;
        };
        "minecraft:allowlist": {
            request_params: undefined;
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
            request_params: undefined;
            response: AllowlistClearResult;
        };

        "minecraft:bans": { request_params: undefined; response: BansResult };
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
            request_params: undefined;
            response: BansClearResult;
        };

        "minecraft:ip_bans": {
            request_params: undefined;
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
            request_params: undefined;
            response: IpBansClearResult;
        };

        "minecraft:players": {
            request_params: undefined;
            response: PlayersResult;
        };
        "minecraft:players/kick": {
            request_params: PlayersKickParams;
            response: PlayersKickResult;
        };

        "minecraft:operators": {
            request_params: undefined;
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
            request_params: undefined;
            response: OperatorsClearResult;
        };

        "minecraft:server/status": {
            request_params: undefined;
            response: ServerStatusResult;
        };
        "minecraft:server/save": {
            request_params: ServerSaveParams;
            response: ServerSaveResult;
        };
        "minecraft:server/stop": {
            request_params: undefined;
            response: ServerStopResult;
        };
        "minecraft:server/system_message": {
            request_params: ServerSystemMessageParams;
            response: ServerSystemMessageResult;
        };

        "minecraft:serversettings/autosave": {
            request_params: undefined;
            response: ServerSettingsAutosaveResult;
        };
        "minecraft:serversettings/autosave/set": {
            request_params: ServerSettingsAutosaveSetParams;
            response: ServerSettingsAutosaveSetResult;
        };
        "minecraft:serversettings/difficulty": {
            request_params: undefined;
            response: ServerSettingsDifficultyResult;
        };
        "minecraft:serversettings/difficulty/set": {
            request_params: ServerSettingsDifficultySetParams;
            response: ServerSettingsDifficultySetResult;
        };
        "minecraft:serversettings/enforce_allowlist": {
            request_params: undefined;
            response: ServerSettingsEnforceAllowlistResult;
        };
        "minecraft:serversettings/enforce_allowlist/set": {
            request_params: ServerSettingsEnforceAllowlistSetParams;
            response: ServerSettingsEnforceAllowlistSetResult;
        };
        "minecraft:serversettings/use_allowlist": {
            request_params: undefined;
            response: ServerSettingsUseAllowlistResult;
        };
        "minecraft:serversettings/use_allowlist/set": {
            request_params: ServerSettingsUseAllowlistSetParams;
            response: ServerSettingsUseAllowlistSetResult;
        };
        "minecraft:serversettings/max_players": {
            request_params: undefined;
            response: ServerSettingsMaxPlayersResult;
        };
        "minecraft:serversettings/max_players/set": {
            request_params: ServerSettingsMaxPlayersSetParams;
            response: ServerSettingsMaxPlayersSetResult;
        };
        "minecraft:serversettings/pause_when_empty_seconds": {
            request_params: undefined;
            response: ServerSettingsPauseWhenEmptySecondsResult;
        };
        "minecraft:serversettings/pause_when_empty_seconds/set": {
            request_params: ServerSettingsPauseWhenEmptySecondsSetParams;
            response: ServerSettingsPauseWhenEmptySecondsSetResult;
        };
        "minecraft:serversettings/player_idle_timeout": {
            request_params: undefined;
            response: ServerSettingsPlayerIdleTimeoutResult;
        };
        "minecraft:serversettings/player_idle_timeout/set": {
            request_params: ServerSettingsPlayerIdleTimeoutSetParams;
            response: ServerSettingsPlayerIdleTimeoutSetResult;
        };
        "minecraft:serversettings/allow_flight": {
            request_params: undefined;
            response: ServerSettingsAllowFlightResult;
        };
        "minecraft:serversettings/allow_flight/set": {
            request_params: ServerSettingsAllowFlightSetParams;
            response: ServerSettingsAllowFlightSetResult;
        };
        "minecraft:serversettings/motd": {
            request_params: undefined;
            response: ServerSettingsMotdResult;
        };
        "minecraft:serversettings/motd/set": {
            request_params: ServerSettingsMotdSetParams;
            response: ServerSettingsMotdSetResult;
        };
        "minecraft:serversettings/spawn_protection_radius": {
            request_params: undefined;
            response: ServerSettingsSpawnProtectionRadiusResult;
        };
        "minecraft:serversettings/spawn_protection_radius/set": {
            request_params: ServerSettingsSpawnProtectionRadiusSetParams;
            response: ServerSettingsSpawnProtectionRadiusSetResult;
        };
        "minecraft:serversettings/force_game_mode": {
            request_params: undefined;
            response: ServerSettingsForceGameModeResult;
        };
        "minecraft:serversettings/force_game_mode/set": {
            request_params: ServerSettingsForceGameModeSetParams;
            response: ServerSettingsForceGameModeSetResult;
        };
        "minecraft:serversettings/game_mode": {
            request_params: undefined;
            response: ServerSettingsGameModeResult;
        };
        "minecraft:serversettings/game_mode/set": {
            request_params: ServerSettingsGameModeSetParams;
            response: ServerSettingsGameModeSetResult;
        };
        "minecraft:serversettings/view_distance": {
            request_params: undefined;
            response: ServerSettingsViewDistanceResult;
        };
        "minecraft:serversettings/view_distance/set": {
            request_params: ServerSettingsViewDistanceSetParams;
            response: ServerSettingsViewDistanceSetResult;
        };
        "minecraft:serversettings/simulation_distance": {
            request_params: undefined;
            response: ServerSettingsSimulationDistanceResult;
        };
        "minecraft:serversettings/simulation_distance/set": {
            request_params: ServerSettingsSimulationDistanceSetParams;
            response: ServerSettingsSimulationDistanceSetResult;
        };
        "minecraft:serversettings/accept_transfers": {
            request_params: undefined;
            response: ServerSettingsAcceptTransfersResult;
        };
        "minecraft:serversettings/accept_transfers/set": {
            request_params: ServerSettingsAcceptTransfersSetParams;
            response: ServerSettingsAcceptTransfersSetResult;
        };
        "minecraft:serversettings/status_heartbeat_interval": {
            request_params: undefined;
            response: ServerSettingsStatusHeartbeatIntervalResult;
        };
        "minecraft:serversettings/status_heartbeat_interval/set": {
            request_params: ServerSettingsStatusHeartbeatIntervalSetParams;
            response: ServerSettingsStatusHeartbeatIntervalSetResult;
        };
        "minecraft:serversettings/operator_user_permission_level": {
            request_params: undefined;
            response: ServerSettingsOperatorUserPermissionLevelResult;
        };
        "minecraft:serversettings/operator_user_permission_level/set": {
            request_params: ServerSettingsOperatorUserPermissionLevelSetParams;
            response: ServerSettingsOperatorUserPermissionLevelSetResult;
        };
        "minecraft:serversettings/hide_online_players": {
            request_params: undefined;
            response: ServerSettingsHideOnlinePlayersResult;
        };
        "minecraft:serversettings/hide_online_players/set": {
            request_params: ServerSettingsHideOnlinePlayersSetParams;
            response: ServerSettingsHideOnlinePlayersSetResult;
        };
        "minecraft:serversettings/status_replies": {
            request_params: undefined;
            response: ServerSettingsStatusRepliesResult;
        };
        "minecraft:serversettings/status_replies/set": {
            request_params: ServerSettingsStatusRepliesSetParams;
            response: ServerSettingsStatusRepliesSetResult;
        };
        "minecraft:serversettings/entity_broadcast_range": {
            request_params: undefined;
            response: ServerSettingsEntityBroadcastRangeResult;
        };
        "minecraft:serversettings/entity_broadcast_range/set": {
            request_params: ServerSettingsEntityBroadcastRangeSetParams;
            response: ServerSettingsEntityBroadcastRangeSetResult;
        };

        "minecraft:gamerules": {
            request_params: undefined;
            response: GamerulesResult;
        };
        "minecraft:gamerules/update": {
            request_params: GamerulesUpdateParams;
            response: GamerulesUpdateResult;
        };
    }

    export type MinecraftMethodName = keyof MinecraftRequests;

    export type MinecraftRpcRequest<M extends MinecraftMethodName> =
        JsonRpcRequest<M, MinecraftRequests[M]["request_params"]>;

    export type MinecraftRpcSuccessResponse<M extends MinecraftMethodName> =
        JsonRpcSuccessResponse<MinecraftRequests[M]["response"]>;
}
