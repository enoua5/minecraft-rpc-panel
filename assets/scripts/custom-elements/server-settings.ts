import { customElement, state } from "lit/decorators.js";
import { LitElementWithAdpotedStyles } from "./lit-element-with-adpoted-styles";
import { css, html } from "lit";
import { Difficulty, GameMode } from "../mcsmp/mcmp.mjs";
import { client } from "../mcsmp/mcmp-client";
import { createRef, ref, Ref } from "lit/directives/ref.js";

@customElement("mcsmp-server-settings")
class ServerSettingsManagerElement extends LitElementWithAdpotedStyles {
    static styles = css`
        .wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: stretch;
            overflow: auto;
            gap: 1.5em;
        }
        .rule-wrapper {
            display: flex;
            align-items: flex-start;
            gap: 0.5em;
        }

        .rule-wrapper-boolean {
            flex-direction: row;
        }
        .rule-wrapper-integer {
            flex-direction: column-reverse;
        }
        .rule-wrapper-difficulty {
            flex-direction: column-reverse;
        }
        .rule-wrapper-mode {
            flex-direction: column-reverse;
        }

        .buttons {
            display: flex;
            flex-direction: row;
            gap: 2em;
        }

        .change-count {
            font-style: italic;
        }
    `;
    @state()
    private autosave: boolean = false;
    @state()
    private staged_autosave: boolean | null = null;
    @state()
    private difficulty: Difficulty = "normal";
    @state()
    private staged_difficulty: Difficulty | null = null;
    @state()
    private enforce_allowlist: boolean = false;
    @state()
    private staged_enforce_allowlist: boolean | null = null;
    @state()
    private use_allowlist: boolean = false;
    @state()
    private staged_use_allowlist: boolean | null = null;
    @state()
    private max_players: number = 0;
    @state()
    private staged_max_players: number | null = null;
    @state()
    private pause_when_empty_seconds: number = 0;
    @state()
    private staged_pause_when_empty_seconds: number | null = null;
    @state()
    private player_idle_timeout: number = 0;
    @state()
    private staged_player_idle_timeout: number | null = null;
    @state()
    private allow_flight: boolean = false;
    @state()
    private staged_allow_flight: boolean | null = null;
    @state()
    private motd: string = "";
    @state()
    private staged_motd: string | null = null;
    @state()
    private spawn_protection_radius: number = 0;
    @state()
    private staged_spawn_protection_radius: number | null = null;
    @state()
    private force_game_mode: boolean = false;
    @state()
    private staged_force_game_mode: boolean | null = null;
    @state()
    private game_mode: GameMode = "survival";
    @state()
    private staged_game_mode: GameMode | null = null;
    @state()
    private view_distance: number = 0;
    @state()
    private staged_view_distance: number | null = null;
    @state()
    private simulation_distance: number = 0;
    @state()
    private staged_simulation_distance: number | null = null;
    @state()
    private accept_transfers: boolean = false;
    @state()
    private staged_accept_transfers: boolean | null = null;
    @state()
    private operator_user_permission_level: number = 0;
    @state()
    private staged_operator_user_permission_level: number | null = null;
    @state()
    private hide_online_players: boolean = false;
    @state()
    private staged_hide_online_players: boolean | null = null;
    @state()
    private status_replies: boolean = false;
    @state()
    private staged_status_replies: boolean | null = null;
    @state()
    private entity_broadcast_range: number = 0;
    @state()
    private staged_entity_broadcast_range: number | null = null;

    @state()
    private saving: boolean = false;

    private autosave_input_ref: Ref<HTMLInputElement> = createRef();
    private difficulty_input_ref: Ref<HTMLSelectElement> = createRef();
    private enforce_allowlist_input_ref: Ref<HTMLInputElement> = createRef();
    private use_allowlist_input_ref: Ref<HTMLInputElement> = createRef();
    private max_players_input_ref: Ref<HTMLInputElement> = createRef();
    private pause_when_empty_seconds_input_ref: Ref<HTMLInputElement> =
        createRef();
    private player_idle_timeout_input_ref: Ref<HTMLInputElement> = createRef();
    private allow_flight_input_ref: Ref<HTMLInputElement> = createRef();
    private motd_input_ref: Ref<HTMLInputElement> = createRef();
    private spawn_protection_radius_input_ref: Ref<HTMLInputElement> =
        createRef();
    private force_game_mode_input_ref: Ref<HTMLInputElement> = createRef();
    private game_mode_input_ref: Ref<HTMLInputElement> = createRef();
    private view_distance_input_ref: Ref<HTMLInputElement> = createRef();
    private simulation_distance_input_ref: Ref<HTMLInputElement> = createRef();
    private accept_transfers_input_ref: Ref<HTMLInputElement> = createRef();
    private operator_user_permission_level_input_ref: Ref<HTMLInputElement> =
        createRef();
    private hide_online_players_input_ref: Ref<HTMLInputElement> = createRef();
    private status_replies_input_ref: Ref<HTMLInputElement> = createRef();
    private entity_broadcast_range_input_ref: Ref<HTMLInputElement> =
        createRef();

    connectedCallback(): void {
        super.connectedCallback();
        client.getAutosave().then((autosave) => (this.autosave = autosave));
        client
            .getDifficulty()
            .then((difficulty) => (this.difficulty = difficulty));
        client
            .getEnforceAllowlist()
            .then(
                (enforce_allowlist) =>
                    (this.enforce_allowlist = enforce_allowlist)
            );
        client
            .getUseAllowlist()
            .then((use_allowlist) => (this.use_allowlist = use_allowlist));
        client
            .getMaxPlayers()
            .then((max_players) => (this.max_players = max_players));
        client
            .getPauseWhenEmptySeconds()
            .then(
                (pause_when_empty_seconds) =>
                    (this.pause_when_empty_seconds = pause_when_empty_seconds)
            );
        client
            .getPlayerIdleTimeout()
            .then(
                (player_idle_timeout) =>
                    (this.player_idle_timeout = player_idle_timeout)
            );
        client
            .getAllowFlight()
            .then((allow_flight) => (this.allow_flight = allow_flight));
        client.getMotd().then((motd) => (this.motd = motd));
        client
            .getSpawnProtectionRadius()
            .then(
                (spawn_protection_radius) =>
                    (this.spawn_protection_radius = spawn_protection_radius)
            );
        client
            .getForceGameMode()
            .then(
                (force_game_mode) => (this.force_game_mode = force_game_mode)
            );
        client.getGameMode().then((game_mode) => (this.game_mode = game_mode));
        client
            .getViewDistance()
            .then((view_distance) => (this.view_distance = view_distance));
        client
            .getSimulationDistance()
            .then(
                (simulation_distance) =>
                    (this.simulation_distance = simulation_distance)
            );
        client
            .getAcceptTransfers()
            .then(
                (accept_transfers) => (this.accept_transfers = accept_transfers)
            );
        client
            .getOperatorUserPermissionLevel()
            .then(
                (operator_user_permission_level) =>
                    (this.operator_user_permission_level =
                        operator_user_permission_level)
            );
        client
            .getHideOnlinePlayers()
            .then(
                (hide_online_players) =>
                    (this.hide_online_players = hide_online_players)
            );
        client
            .getStatusReplies()
            .then((status_replies) => (this.status_replies = status_replies));
        client
            .getEntityBroadcastRange()
            .then(
                (entity_broadcast_range) =>
                    (this.entity_broadcast_range = entity_broadcast_range)
            );
    }

    getUpdateCount = () => {
        let count = 0;
        count += this.staged_autosave != null ? 1 : 0;
        count += this.staged_difficulty != null ? 1 : 0;
        count += this.staged_enforce_allowlist != null ? 1 : 0;
        count += this.staged_use_allowlist != null ? 1 : 0;
        count += this.staged_max_players != null ? 1 : 0;
        count += this.staged_pause_when_empty_seconds != null ? 1 : 0;
        count += this.staged_player_idle_timeout != null ? 1 : 0;
        count += this.staged_allow_flight != null ? 1 : 0;
        count += this.staged_motd != null ? 1 : 0;
        count += this.staged_spawn_protection_radius != null ? 1 : 0;
        count += this.staged_force_game_mode != null ? 1 : 0;
        count += this.staged_game_mode != null ? 1 : 0;
        count += this.staged_view_distance != null ? 1 : 0;
        count += this.staged_simulation_distance != null ? 1 : 0;
        count += this.staged_accept_transfers != null ? 1 : 0;
        count += this.staged_operator_user_permission_level != null ? 1 : 0;
        count += this.staged_hide_online_players != null ? 1 : 0;
        count += this.staged_status_replies != null ? 1 : 0;
        count += this.staged_entity_broadcast_range != null ? 1 : 0;
        return count;
    };

    forceDisplayUpdate = () => {
        this.autosave_input_ref.value!.checked = this.autosave;
        this.difficulty_input_ref.value!.value = this.difficulty;
        this.difficulty_input_ref
            .value!.querySelectorAll("option")
            .forEach((option) => {
                option.selected = option.value === this.difficulty;
            });
        this.enforce_allowlist_input_ref.value!.checked =
            this.enforce_allowlist;
        this.use_allowlist_input_ref.value!.checked = this.use_allowlist;
        this.max_players_input_ref.value!.value = String(this.max_players);
        this.pause_when_empty_seconds_input_ref.value!.value = String(
            this.pause_when_empty_seconds
        );
        this.player_idle_timeout_input_ref.value!.value = String(
            this.player_idle_timeout
        );
        this.allow_flight_input_ref.value!.checked = this.allow_flight;
        this.motd_input_ref.value!.value = this.motd;
        this.spawn_protection_radius_input_ref.value!.value = String(
            this.spawn_protection_radius
        );
        this.force_game_mode_input_ref.value!.value = String(
            this.force_game_mode
        );
        this.game_mode_input_ref.value!.value = this.game_mode;
        this.game_mode_input_ref
            .value!.querySelectorAll("option")
            .forEach((option) => {
                option.selected = option.value === this.game_mode;
            });
        this.view_distance_input_ref.value!.value = String(this.view_distance);
        this.simulation_distance_input_ref.value!.value = String(
            this.simulation_distance
        );
        this.accept_transfers_input_ref.value!.checked = this.accept_transfers;
        this.operator_user_permission_level_input_ref.value!.value = String(
            this.operator_user_permission_level
        );
        this.hide_online_players_input_ref.value!.checked =
            this.hide_online_players;
        this.status_replies_input_ref.value!.checked = this.status_replies;
        this.entity_broadcast_range_input_ref.value!.value = String(
            this.entity_broadcast_range
        );
    };

    clearForm = () => {
        this.staged_autosave = null;
        this.staged_difficulty = null;
        this.staged_enforce_allowlist = null;
        this.staged_use_allowlist = null;
        this.staged_max_players = null;
        this.staged_pause_when_empty_seconds = null;
        this.staged_player_idle_timeout = null;
        this.staged_allow_flight = null;
        this.staged_motd = null;
        this.staged_spawn_protection_radius = null;
        this.staged_force_game_mode = null;
        this.staged_game_mode = null;
        this.staged_view_distance = null;
        this.staged_simulation_distance = null;
        this.staged_accept_transfers = null;
        this.staged_operator_user_permission_level = null;
        this.staged_hide_online_players = null;
        this.staged_status_replies = null;
        this.staged_entity_broadcast_range = null;
        this.forceDisplayUpdate();
    };

    save() {
        this.saving = true;
        Promise.all([
            (async () => {
                if (this.staged_autosave != null)
                    await client
                        .setAutosave(this.staged_autosave)
                        .then((autosave) => {
                            this.autosave = autosave;
                            this.staged_autosave = null;
                        });
            })(),
            (async () => {
                if (this.staged_difficulty != null)
                    await client
                        .setDifficulty(this.staged_difficulty)
                        .then((difficulty) => {
                            this.difficulty = difficulty;
                            this.staged_difficulty = null;
                        });
            })(),
            (async () => {
                if (this.staged_enforce_allowlist != null)
                    await client
                        .setEnforceAllowlist(this.staged_enforce_allowlist)
                        .then((enforce_allowlist) => {
                            this.enforce_allowlist = enforce_allowlist;
                            this.staged_enforce_allowlist = null;
                        });
            })(),
            (async () => {
                if (this.staged_use_allowlist != null)
                    await client
                        .setUseAllowlist(this.staged_use_allowlist)
                        .then((use_allowlist) => {
                            this.use_allowlist = use_allowlist;
                            this.staged_use_allowlist = null;
                        });
            })(),
            (async () => {
                if (this.staged_max_players != null)
                    await client
                        .setMaxPlayers(this.staged_max_players)
                        .then((max_players) => {
                            this.max_players = max_players;
                            this.staged_max_players = null;
                        });
            })(),
            (async () => {
                if (this.staged_pause_when_empty_seconds != null)
                    await client
                        .setPauseWhenEmptySeconds(
                            this.staged_pause_when_empty_seconds
                        )
                        .then((pause_when_empty_seconds) => {
                            this.pause_when_empty_seconds =
                                pause_when_empty_seconds;
                            this.staged_pause_when_empty_seconds = null;
                        });
            })(),
            (async () => {
                if (this.staged_player_idle_timeout != null)
                    await client
                        .setPlayerIdleTimeout(this.staged_player_idle_timeout)
                        .then((player_idle_timeout) => {
                            this.player_idle_timeout = player_idle_timeout;
                            this.staged_player_idle_timeout = null;
                        });
            })(),
            (async () => {
                if (this.staged_allow_flight != null)
                    await client
                        .setAllowFlight(this.staged_allow_flight)
                        .then((allow_flight) => {
                            this.allow_flight = allow_flight;
                            this.staged_allow_flight = null;
                        });
            })(),
            (async () => {
                if (this.staged_motd != null)
                    await client.setMotd(this.staged_motd).then((motd) => {
                        this.motd = motd;
                        this.staged_motd = null;
                    });
            })(),
            (async () => {
                if (this.staged_spawn_protection_radius != null)
                    await client
                        .setSpawnProtectionRadius(
                            this.staged_spawn_protection_radius
                        )
                        .then((spawn_protection_radius) => {
                            this.spawn_protection_radius =
                                spawn_protection_radius;
                            this.staged_spawn_protection_radius = null;
                        });
            })(),
            (async () => {
                if (this.staged_force_game_mode != null)
                    await client
                        .setForceGameMode(this.staged_force_game_mode)
                        .then((force_game_mode) => {
                            this.force_game_mode = force_game_mode;
                            this.staged_force_game_mode = null;
                        });
            })(),
            (async () => {
                if (this.staged_game_mode != null)
                    await client
                        .setGameMode(this.staged_game_mode)
                        .then((game_mode) => {
                            this.game_mode = game_mode;
                            this.staged_game_mode = null;
                        });
            })(),
            (async () => {
                if (this.staged_view_distance != null)
                    await client
                        .setViewDistance(this.staged_view_distance)
                        .then((view_distance) => {
                            this.view_distance = view_distance;
                            this.staged_view_distance = null;
                        });
            })(),
            (async () => {
                if (this.staged_simulation_distance != null)
                    await client
                        .setSimulationDistance(this.staged_simulation_distance)
                        .then((simulation_distance) => {
                            this.simulation_distance = simulation_distance;
                            this.staged_simulation_distance = null;
                        });
            })(),
            (async () => {
                if (this.staged_accept_transfers != null)
                    await client
                        .setAcceptTransfers(this.staged_accept_transfers)
                        .then((accept_transfers) => {
                            this.accept_transfers = accept_transfers;
                            this.staged_accept_transfers = null;
                        });
            })(),
            (async () => {
                if (this.staged_operator_user_permission_level != null)
                    await client
                        .setOperatorUserPermissionLevel(
                            this.staged_operator_user_permission_level
                        )
                        .then((operator_user_permission_level) => {
                            this.operator_user_permission_level =
                                operator_user_permission_level;
                            this.staged_operator_user_permission_level = null;
                        });
            })(),
            (async () => {
                if (this.staged_hide_online_players != null)
                    await client
                        .setHideOnlinePlayers(this.staged_hide_online_players)
                        .then((hide_online_players) => {
                            this.hide_online_players = hide_online_players;
                            this.staged_hide_online_players = null;
                        });
            })(),
            (async () => {
                if (this.staged_status_replies != null)
                    await client
                        .setStatusReplies(this.staged_status_replies)
                        .then((status_replies) => {
                            this.status_replies = status_replies;
                            this.staged_status_replies = null;
                        });
            })(),
            (async () => {
                if (this.staged_entity_broadcast_range != null)
                    await client
                        .setEntityBroadcastRange(
                            this.staged_entity_broadcast_range
                        )
                        .then((entity_broadcast_range) => {
                            this.entity_broadcast_range =
                                entity_broadcast_range;
                            this.staged_entity_broadcast_range = null;
                        });
            })(),
        ])
            .then(() => {
                this.forceDisplayUpdate();
            })
            .finally(() => {
                this.saving = false;
            });
    }

    render() {
        const update_count = this.getUpdateCount();
        return html`
            <div class="wrapper">
                <label class="rule-wrapper rule-wrapper-boolean"
                    ><input
                        name="autosave"
                        type="checkbox"
                        ${ref(this.autosave_input_ref)}
                        value=${this.autosave}
                        @change=${(e: Event) => (this.staged_autosave = (e.currentTarget as HTMLInputElement).checked)}
                    />
                    autosave</label
                >
                <label class="rule-wrapper rule-wrapper-difficulty">
                    <select
                        ${ref(this.difficulty_input_ref)}
                        value=${this.difficulty}
                        @change=${(e: Event) => (this.staged_difficulty = (e.currentTarget as HTMLSelectElement).value as Difficulty)}
                    >
                        <option
                            value="peaceful"
                            ?selected=${this.difficulty === "peaceful"}
                        >
                            peaceful
                        </option>
                        <option
                            value="easy"
                            ?selected=${this.difficulty === "easy"}
                        >
                            easy
                        </option>
                        <option
                            value="normal"
                            ?selected=${this.difficulty === "normal"}
                        >
                            normal
                        </option>
                        <option
                            value="hard"
                            ?selected=${this.difficulty === "hard"}
                        >
                            hard
                        </option>
                    </select>
                    difficulty</label
                >
                <label class="rule-wrapper rule-wrapper-boolean"
                    ><input
                        name="enforce_allowlist"
                        type="checkbox"
                        ${ref(this.enforce_allowlist_input_ref)}
                        value=${this.enforce_allowlist}
                        @change=${(e: Event) => (this.staged_enforce_allowlist = (e.currentTarget as HTMLInputElement).checked)}
                    />
                    enforce_allowlist</label
                >
                <label class="rule-wrapper rule-wrapper-boolean"
                    ><input
                        name="use_allowlist"
                        type="checkbox"
                        ${ref(this.use_allowlist_input_ref)}
                        value=${this.use_allowlist}
                        @change=${(e: Event) => (this.staged_use_allowlist = (e.currentTarget as HTMLInputElement).checked)}
                    />
                    use_allowlist</label
                >
                <label class="rule-wrapper rule-wrapper-integer"
                    ><input
                        name="max_players"
                        type="number"
                        ${ref(this.max_players_input_ref)}
                        value=${this.max_players}
                        @change=${(e: Event) => (this.staged_max_players = (e.currentTarget as HTMLInputElement).valueAsNumber)}
                    />
                    max_players</label
                >
                <label class="rule-wrapper rule-wrapper-integer"
                    ><input
                        name="pause_when_empty_seconds"
                        type="number"
                        ${ref(this.pause_when_empty_seconds_input_ref)}
                        value=${this.pause_when_empty_seconds}
                        @change=${(e: Event) => (this.staged_pause_when_empty_seconds = (e.currentTarget as HTMLInputElement).valueAsNumber)}
                    />
                    pause_when_empty_seconds</label
                >
                <label class="rule-wrapper rule-wrapper-integer"
                    ><input
                        name="player_idle_timeout"
                        type="number"
                        ${ref(this.player_idle_timeout_input_ref)}
                        value=${this.player_idle_timeout}
                        @change=${(e: Event) => (this.staged_player_idle_timeout = (e.currentTarget as HTMLInputElement).valueAsNumber)}
                    />
                    player_idle_timeout</label
                >
                <label class="rule-wrapper rule-wrapper-boolean"
                    ><input
                        name="allow_flight"
                        type="checkbox"
                        ${ref(this.allow_flight_input_ref)}
                        value=${this.allow_flight}
                        @change=${(e: Event) => (this.staged_allow_flight = (e.currentTarget as HTMLInputElement).checked)}
                    />
                    allow_flight</label
                >
                <label class="rule-wrapper rule-wrapper-string"
                    ><input
                        name="motd"
                        type="text"
                        ${ref(this.motd_input_ref)}
                        value=${this.motd}
                        @change=${(e: Event) => (this.staged_motd = (e.currentTarget as HTMLInputElement).value)}
                    />
                    motd</label
                >
                <label class="rule-wrapper rule-wrapper-integer"
                    ><input
                        name="spawn_protection_radius"
                        type="number"
                        ${ref(this.spawn_protection_radius_input_ref)}
                        value=${this.spawn_protection_radius}
                        @change=${(e: Event) => (this.staged_spawn_protection_radius = (e.currentTarget as HTMLInputElement).valueAsNumber)}
                    />
                    spawn_protection_radius</label
                >
                <label class="rule-wrapper rule-wrapper-boolean"
                    ><input
                        name="force_game_mode"
                        type="checkbox"
                        ${ref(this.force_game_mode_input_ref)}
                        value=${this.force_game_mode}
                        @change=${(e: Event) => (this.staged_force_game_mode = (e.currentTarget as HTMLInputElement).checked)}
                    />
                    force_game_mode</label
                >
                <label class="rule-wrapper rule-wrapper-mode">
                    <select
                        name="game_mode"
                        ${ref(this.game_mode_input_ref)}
                        value=${this.game_mode}
                        @change=${(e: Event) => (this.staged_game_mode = (e.currentTarget as HTMLSelectElement).value as GameMode)}
                    >
                        <option
                            value="survival"
                            ?selected=${this.game_mode === "survival"}
                        >
                            survival
                        </option>
                        <option
                            value="creative"
                            ?selected=${this.game_mode === "creative"}
                        >
                            creative
                        </option>
                        <option
                            value="spectator"
                            ?selected=${this.game_mode === "spectator"}
                        >
                            spectator
                        </option>
                        <option
                            value="adventure"
                            ?selected=${this.game_mode === "adventure"}
                        >
                            adventure
                        </option>
                    </select>
                    game_mode</label
                >
                <label class="rule-wrapper rule-wrapper-integer"
                    ><input
                        name="view_distance"
                        type="number"
                        ${ref(this.view_distance_input_ref)}
                        value=${this.view_distance}
                        @change=${(e: Event) => (this.staged_view_distance = (e.currentTarget as HTMLInputElement).valueAsNumber)}
                    />
                    view_distance</label
                >
                <label class="rule-wrapper rule-wrapper-integer"
                    ><input
                        name="simulation_distance"
                        type="number"
                        ${ref(this.simulation_distance_input_ref)}
                        value=${this.simulation_distance}
                        @change=${(e: Event) => (this.staged_simulation_distance = (e.currentTarget as HTMLInputElement).valueAsNumber)}
                    />
                    simulation_distance</label
                >
                <label class="rule-wrapper rule-wrapper-boolean"
                    ><input
                        name="accept_transfers"
                        type="checkbox"
                        ${ref(this.accept_transfers_input_ref)}
                        value=${this.accept_transfers}
                        @change=${(e: Event) => (this.staged_accept_transfers = (e.currentTarget as HTMLInputElement).checked)}
                    />
                    accept_transfers</label
                >
                <label class="rule-wrapper rule-wrapper-integer"
                    ><input
                        name="operator_user_permission_level"
                        type="number"
                        ${ref(this.operator_user_permission_level_input_ref)}
                        value=${this.operator_user_permission_level}
                        @change=${(e: Event) => (this.staged_operator_user_permission_level = (e.currentTarget as HTMLInputElement).valueAsNumber)}
                    />
                    operator_user_permission_level</label
                >
                <label class="rule-wrapper rule-wrapper-boolean"
                    ><input
                        name="hide_online_players"
                        type="checkbox"
                        ${ref(this.hide_online_players_input_ref)}
                        value=${this.hide_online_players}
                        @change=${(e: Event) => (this.staged_hide_online_players = (e.currentTarget as HTMLInputElement).checked)}
                    />
                    hide_online_players</label
                >
                <label class="rule-wrapper rule-wrapper-boolean"
                    ><input
                        name="status_replies"
                        type="checkbox"
                        ${ref(this.status_replies_input_ref)}
                        value=${this.status_replies}
                        @change=${(e: Event) => (this.staged_status_replies = (e.currentTarget as HTMLInputElement).checked)}
                    />
                    status_replies</label
                >
                <label class="rule-wrapper rule-wrapper-integer"
                    ><input
                        name="entity_broadcast_range"
                        type="number"
                        ${ref(this.entity_broadcast_range_input_ref)}
                        value=${this.entity_broadcast_range}
                        @change=${(e: Event) => (this.staged_entity_broadcast_range = (e.currentTarget as HTMLInputElement).valueAsNumber)}
                    />
                    entity_broadcast_range</label
                >
                <p class="change-count">
                    ${
                        this.saving
                            ? "updating..."
                            : `${update_count} server setting${update_count === 1 ? "" : "s"} staged`
                    }
                </p>
                <div class="buttons">
                    <button
                        ?disabled=${update_count === 0 || this.saving}
                        @click=${this.save}
                    >
                        Save
                    </button>
                    <button
                        ?disabled=${update_count === 0 || this.saving}
                        style="--button-bg: var(--color-unimportant)"
                        @click=${this.clearForm}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-server-settings": ServerSettingsManagerElement;
    }
}
