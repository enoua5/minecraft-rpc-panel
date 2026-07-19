import { customElement, state } from "lit/decorators.js";
import { LitElementWithAdpotedStyles } from "./lit-element-with-adpoted-styles";
import { css, html, nothing } from "lit";
import {
    IpBan,
    Operator,
    Player,
    ServerState,
    UserBan,
} from "../mcsmp/mcmp.mjs";
import { client } from "../mcsmp/mcmp-client";
import { playerEq } from "../util/player";
import { createRef, ref, Ref } from "lit/directives/ref.js";

@customElement("mcsmp-players")
class PlayerManagementElement extends LitElementWithAdpotedStyles {
    static styles = css`
        .wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: stretch;
            overflow: auto;
            gap: 2em;
        }

        .wrapper section {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: stretch;
            gap: 1em;
        }

        .online-player {
            display: flex;
            flex-direction: row;
            gap: 3em;
            width: 100%;
        }

        .allowed-player {
            display: flex;
            flex-direction: row;
            gap: 3em;
            width: 100%;
        }

        .banned-player {
            display: flex;
            flex-direction: row;
            gap: 3em;
            width: 100%;
        }

        .banned-ip {
            display: flex;
            flex-direction: row;
            gap: 3em;
            width: 100%;
        }

        .player-info {
            display: flex;
            flex-direction: row;
            gap: 1em;
        }

        .player-additional {
            font-style: italic;
        }

        .player-op {
            color: var(--color-primary);
        }

        .player-head {
            height: 1em;
            width: 1em;
        }

        .controls {
            width: 15ch;
        }

        .allow-list-form {
            display: flex;
            flex-direction: row;
            gap: 1em;
            width: 100%;
        }

        .allow-list-form input[type="text"] {
            flex: 1;
        }

        .ban-list-form {
            display: flex;
            flex-direction: row;
            align-content: flex-end;
            gap: 1em;
            width: 100%;
        }

        .ban-list-form * {
            display: flex;
            flex-direction: column;
            gap: 0.4em;
        }

        .ip-ban-info {
            font-style: italic;
        }
    `;

    @state()
    private players: Player[] = [];
    @state()
    private operators: Operator[] = [];
    @state()
    private use_allowlist: boolean = false;
    @state()
    private max_players: number = 0;
    @state()
    private allowlist: Player[] = [];
    @state()
    private ip_bans: IpBan[] = [];
    @state()
    private user_bans: UserBan[] = [];

    private allow_list_input_ref: Ref<HTMLInputElement> = createRef();
    private ban_list_user_input_ref: Ref<HTMLInputElement> = createRef();
    private ban_list_reason_input_ref: Ref<HTMLInputElement> = createRef();
    private ban_list_expires_input_ref: Ref<HTMLInputElement> = createRef();
    private ban_list_ip_input_ref: Ref<HTMLInputElement> = createRef();
    private ip_ban_list_reason_input_ref: Ref<HTMLInputElement> = createRef();
    private ip_ban_list_expires_input_ref: Ref<HTMLInputElement> = createRef();

    handleStatusUpdate = (status: ServerState) => {
        if (status.players) {
            this.players = status.players;
        }
    };

    handlePlayerJoined = (player: Player) => {
        this.players.push(player);
        this.requestUpdate();
    };

    handlePlayerLeft = (player: Player) => {
        this.players = this.players.filter((p) => !playerEq(p, player));
    };

    handleOperatorAdded = (operator: Operator) => {
        this.operators.push(operator);
        this.requestUpdate();
    };

    handleOperatorRemoved = (operator: Operator) => {
        this.operators = this.operators.filter(
            (op) => !playerEq(op.player, operator.player)
        );
    };

    handleAllowlistAdd = (player: Player) => {
        this.allowlist.push(player);
        this.requestUpdate();
    };

    handleAllowlistRemove = (player: Player) => {
        this.allowlist = this.allowlist.filter((p) => !playerEq(p, player));
    };

    handleIpBanAdd = (ip: IpBan) => {
        this.ip_bans.push(ip);
        this.requestUpdate();
    };

    handleIpBanRemove = (ip: string) => {
        this.ip_bans = this.ip_bans.filter((ban) => ban.ip !== ip);
    };

    handleUserBanAdd = (user: UserBan) => {
        this.user_bans.push(user);
        this.requestUpdate();
    };

    handleUserBanRemove = (user: Player) => {
        this.user_bans = this.user_bans.filter(
            (ban) => !playerEq(ban.player, user)
        );
    };

    connectedCallback() {
        super.connectedCallback();

        client.getPlayers().then((players) => (this.players = players));
        client.getOperators().then((operators) => (this.operators = operators));
        client.getAllowList().then((allowlist) => (this.allowlist = allowlist));
        client.getIpBans().then((ip_bans) => (this.ip_bans = ip_bans));
        client.getBans().then((user_bans) => (this.user_bans = user_bans));
        client
            .getUseAllowlist()
            .then((use_allowlist) => (this.use_allowlist = use_allowlist));
        client
            .getMaxPlayers()
            .then((max_players) => (this.max_players = max_players));

        client.addServerStatusListener(this.handleStatusUpdate);

        client.addPlayerJoinedListener(this.handlePlayerJoined);
        client.addPlayerLeftListener(this.handlePlayerLeft);

        client.addOperatorAddedListener(this.handleOperatorAdded);
        client.addOperatorRemovedListener(this.handleOperatorRemoved);

        client.addAllowListAddedListener(this.handleAllowlistAdd);
        client.addAllowListRemovedListener(this.handleAllowlistRemove);

        client.addIpBanAddedListener(this.handleIpBanAdd);
        client.addIpBanRemovedListener(this.handleIpBanRemove);

        client.addBanAddedListener(this.handleUserBanAdd);
        client.addBanRemovedListener(this.handleUserBanRemove);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        client.removeServerStatusListener(this.handleStatusUpdate);

        client.removePlayerJoinedListener(this.handlePlayerJoined);
        client.removePlayerLeftListener(this.handlePlayerLeft);

        client.removeOperatorAddedListener(this.handleOperatorAdded);
        client.removeOperatorRemovedListener(this.handleOperatorRemoved);

        client.removeAllowListAddedListener(this.handleAllowlistAdd);
        client.removeAllowListRemovedListener(this.handleAllowlistRemove);

        client.removeIpBanAddedListener(this.handleIpBanAdd);
        client.removeIpBanRemovedListener(this.handleIpBanRemove);

        client.removeBanAddedListener(this.handleUserBanAdd);
        client.removeBanRemovedListener(this.handleUserBanRemove);
    }

    isOp = (player: Player) => {
        return Boolean(
            this.operators.find((operator) => playerEq(operator.player, player))
        );
    };

    opPlayer = (player: Player) => {
        if (
            confirm(
                `Are you sure you want to add ${player.name || player.id} as an operator?`
            )
        ) {
            client.addOperators([{ player }]);
        }
    };

    deopPlayer = (player: Player) => {
        if (
            confirm(
                `Are you sure you want to remove ${player.name || player.id} as an operator?`
            )
        ) {
            client.removeOperators([player]);
        }
    };

    kickPlayer = (player: Player) => {
        const reason = prompt(`Reason for kicking ${player.name || player.id}`);
        if (reason != null) {
            client.kickPlayers([
                {
                    player,
                    message: reason
                        ? {
                              literal: reason,
                          }
                        : undefined,
                },
            ]);
        }
    };

    removeFromAllowList = (player: Player) => {
        if (
            confirm(
                `Are you are you want to remove ${player.name || player.id} from the allow list?`
            )
        ) {
            client.removeAllowListEntries([player]);
        }
    };

    submitAllowList = (e: Event) => {
        e.preventDefault();

        const value = this.allow_list_input_ref.value?.value;

        if (value) {
            const is_id = Boolean(
                value.match(
                    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
                )
            );
            const player = is_id ? { id: value } : { name: value };
            client.addAllowListEntries([player]);
        }

        if (this.allow_list_input_ref.value) {
            this.allow_list_input_ref.value.value = "";
        }
    };

    submitBanList = (e: Event) => {
        e.preventDefault();
        const player_name = this.ban_list_user_input_ref.value?.value;

        if (!player_name) {
            return;
        }

        if (!confirm(`Are you sure you want to ban ${player_name}?`)) {
            return;
        }

        const is_id = Boolean(
            player_name.match(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
            )
        );
        const player = is_id ? { id: player_name } : { name: player_name };

        const reason = this.ban_list_reason_input_ref.value?.value || undefined;

        const expires = this.ban_list_expires_input_ref.value?.valueAsDate
            ?.toTemporalInstant()
            .toString();

        client.addBans([
            {
                player,
                reason,
                expires,
            },
        ]);

        this.ban_list_user_input_ref.value!.value = "";
        this.ban_list_reason_input_ref.value!.value = "";
        this.ban_list_expires_input_ref.value!.value = "";
    };

    unbanPlayer = (player: Player) => {
        if (
            confirm(
                `Are you sure you want to unban ${player.name || player.id}?`
            )
        ) {
            client.removeBans([player]);
        }
    };

    submitIpBanList = (e: Event) => {
        e.preventDefault();
        const ip = this.ban_list_ip_input_ref.value?.value;

        if (!ip) {
            return;
        }

        if (!confirm(`Are you sure you want to ban ${ip}?`)) {
            return;
        }

        const reason =
            this.ip_ban_list_reason_input_ref.value?.value || undefined;

        const expires = this.ip_ban_list_expires_input_ref.value?.valueAsDate
            ?.toTemporalInstant()
            .toString();

        client.addIpBans([
            {
                ip,
                reason,
                expires,
            },
        ]);

        this.ban_list_ip_input_ref.value!.value = "";
        this.ip_ban_list_reason_input_ref.value!.value = "";
        this.ip_ban_list_expires_input_ref.value!.value = "";
    };

    unbanIp = (ip: string) => {
        if (confirm(`Are you sure you want to unban ${ip}?`)) {
            client.removeIpBans([ip]);
        }
    };

    renderPlayerInfo = (player: Player, additional?: string) => {
        const op = this.isOp(player);

        return html`
            <div class="player-info ${op ? "player-op" : "player-standard"}">
                <img
                    class="player-head"
                    src=${player.id ? `https://api.mineatar.io/face/${player.id}` : "#"}
                />
                <span class="player-name"
                    >${player.name || player.id}
                    ${op ? html`<span class="player-op-indicator">[op]</span>` : nothing}</span
                >
                <span class="player-additional">${additional}</span>
            </div>
        `;
    };

    renderOnlinePlayer = (player: Player) => {
        const op = this.isOp(player);

        return html`
            <div class="online-player">
                <div class="controls">
                    <button
                        style="--button-bg: var(--color-danger)"
                        @click=${() => this.kickPlayer(player)}
                    >
                        Kick
                    </button>
                    <button
                        style="--button-bg: var(${op ? "--color-warning" : "--color-primary"})"
                        @click=${() => (op ? this.deopPlayer(player) : this.opPlayer(player))}
                    >
                        ${op ? "Deop" : "Op"}
                    </button>
                </div>
                ${this.renderPlayerInfo(player)}
            </div>
        `;
    };

    renderAllowedPlayer = (player: Player) => {
        const op = this.isOp(player);

        return html`
            <div class="allowed-player">
                <div class="controls">
                    <button
                        style="--button-bg: var(--color-danger)"
                        @click=${() => this.removeFromAllowList(player)}
                    >
                        Remove
                    </button>
                    <button
                        style="--button-bg: var(${op ? "--color-warning" : "--color-primary"})"
                        @click=${() => (op ? this.deopPlayer(player) : this.opPlayer(player))}
                    >
                        ${op ? "Deop" : "Op"}
                    </button>
                </div>
                ${this.renderPlayerInfo(player)}
            </div>
        `;
    };

    renderAllowListAddForm = () => {
        return html`
            <form class="allow-list-form" @submit=${this.submitAllowList}>
                <input type="text" ${ref(this.allow_list_input_ref)} />
                <input type="submit" value="Add user" />
            </form>
        `;
    };

    renderBannedPlayer = (ban: UserBan) => {
        const additional = `Reason: ${ban.reason || "No reason given"}. Until: ${ban.expires || "manual unban"}`;

        return html`
            <div class="banned-player">
                <div class="controls">
                    <button
                        style="--button-bg: var(--color-danger)"
                        @click=${() => this.unbanPlayer(ban.player)}
                    >
                        Unban
                    </button>
                </div>
                ${this.renderPlayerInfo(ban.player, additional)}
            </div>
        `;
    };

    renderUserBanListAddForm = () => {
        return html`
            <form class="ban-list-form" @submit=${this.submitBanList}>
                <label>
                    Player
                    <input type="text" ${ref(this.ban_list_user_input_ref)} />
                </label>
                <label style="flex: 1">
                    Reason
                    <input type="text" ${ref(this.ban_list_reason_input_ref)} />
                </label>
                <label>
                    Until
                    <input
                        type="date"
                        ${ref(this.ban_list_expires_input_ref)}
                    />
                </label>
                <input
                    type="submit"
                    value="Ban user"
                    style="--button-bg: var(--color-danger)"
                />
            </form>
        `;
    };

    renderIpBanListAddForm = () => {
        return html`
            <form class="ban-list-form" @submit=${this.submitIpBanList}>
                <label>
                    Ip
                    <input type="text" ${ref(this.ban_list_ip_input_ref)} />
                </label>
                <label style="flex: 1">
                    Reason
                    <input
                        type="text"
                        ${ref(this.ip_ban_list_reason_input_ref)}
                    />
                </label>
                <label>
                    Until
                    <input
                        type="date"
                        ${ref(this.ip_ban_list_expires_input_ref)}
                    />
                </label>
                <input
                    type="submit"
                    value="Ban IP"
                    style="--button-bg: var(--color-danger)"
                />
            </form>
        `;
    };

    renderBannedIp = (ban: IpBan) => {
        return html`<div class="banned-ip">
            <div class="controls">
                <button
                    style="--button-bg: var(--color-danger)"
                    @click=${() => this.unbanIp(ban.ip)}
                >
                    Unban
                </button>
            </div>
            <span class="ip-ban-info">
                ${ban.ip} Reason: ${ban.reason || "No reason given"}. Until:
                ${ban.expires || "Manual unban"}.
            </span>
        </div>`;
    };

    render() {
        return html`
            <div class="wrapper">
                <section>
                    <h3>
                        Players online (${this.players.length} /
                        ${this.max_players})
                    </h3>
                    ${this.players.map(this.renderOnlinePlayer)}
                </section>
                <section>
                    <h3>
                        Allowlist
                        (${this.use_allowlist ? "enforced" : "unenforced"})
                    </h3>
                    ${this.allowlist.map(this.renderAllowedPlayer)}
                    ${this.renderAllowListAddForm()}
                </section>
                <section>
                    <h3>Banned players</h3>
                    ${this.user_bans.map(this.renderBannedPlayer)}
                    ${this.renderUserBanListAddForm()}
                </section>
                <section>
                    <h3>Banned IPs</h3>
                    ${this.ip_bans.map(this.renderBannedIp)}
                    ${this.renderIpBanListAddForm()}
                </section>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-players": PlayerManagementElement;
    }
}
