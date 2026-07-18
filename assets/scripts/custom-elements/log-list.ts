import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import {  IpBan, Operator, Player, ServerState, TypedGameRule, UserBan } from "../mcsmp/mcmp.mjs";
import { client } from "../mcsmp/mcmp-client";

@customElement("mcsmp-logs")
class ServerLogsElement extends LitElement {
    @state()
    private events: string[] = [];

    addEvent(event: string) {
        this.events = [...this.events, event];
    }
    handleServerStarted = () => {
        this.addEvent("Server started");
    }

    handleServerStopping = () => {
        this.addEvent("Server stopping...");
    }

    handleServerSaving = () => {
        this.addEvent("Server saving...");
    }

    handleServerSaved = () => {
        this.addEvent("Server saved");
    }

    handleServerActivity = () => {
        this.addEvent("Network connection initialized");
    }

    handleServerStatus = (status: ServerState) => {
        this.addEvent(`Server status: ${JSON.stringify(status)}`);
    }

    handlePlayerJoined = (player: Player) => {
        this.addEvent(`${player.name} joined (id=${player.id})`);
    }

    handlePlayerLeft = (player: Player) => {
        this.addEvent(`${player.name} left`);
    }

    handleOperatorAdded = (operator: Operator) => {
        this.addEvent(`${operator.player.name} added as operator`);
    }

    handleOperatorRemoved = (operator: Operator) => {
        this.addEvent(`${operator.player.name} operator permissions revoked`);
    }

    handleAllowListAdded = (player: Player) => {
        this.addEvent(`${player.name} added to allow-list`);
    }

    handleAllowListRemoved = (player: Player) => {
        this.addEvent(`${player.name} removed from allow-list`);
    }

    handleIpBanAdded = (ip_ban: IpBan) => {
        this.addEvent(`Banned IP ${ip_ban.ip}`);
    }

    handleIpBanRemoved = (ip: string) => {
        this.addEvent(`Removed ban on IP ${ip}`);
    }

    handleBanAdded = (user_ban: UserBan) => {
        this.addEvent(`${user_ban.player.name} banned`);
    }

    handleBanRemoved = (player: Player) => {
        this.addEvent(`${player.name} unbanned`);
    }

    handleGameRuleUpdated = (game_rule: TypedGameRule) => {
        this.addEvent(`Gamerule ${game_rule.key} set to ${JSON.stringify(game_rule.value)}`);
    }

    connectedCallback() {
        super.connectedCallback();
        client.addServerStartedListener(this.handleServerStarted);
        client.addServerStoppingListener(this.handleServerStopping);
        client.addServerSavingListener(this.handleServerSaving);
        client.addServerSavedListener(this.handleServerSaved);
        client.addServerActivityListener(this.handleServerActivity);
        client.addServerStatusListener(this.handleServerStatus);
        client.addPlayerJoinedListener(this.handlePlayerJoined);
        client.addPlayerLeftListener(this.handlePlayerLeft);
        client.addOperatorAddedListener(this.handleOperatorAdded);
        client.addOperatorRemovedListener(this.handleOperatorRemoved);
        client.addAllowListAddedListener(this.handleAllowListAdded);
        client.addAllowListRemovedListener(this.handleAllowListRemoved);
        client.addIpBanAddedListener(this.handleIpBanAdded);
        client.addIpBanRemovedListener(this.handleIpBanRemoved);
        client.addBanAddedListener(this.handleBanAdded);
        client.addBanRemovedListener(this.handleBanRemoved);
        client.addGameRuleUpdatedListener(this.handleGameRuleUpdated);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        client.removeServerStartedListener(this.handleServerStarted);
        client.removeServerStoppingListener(this.handleServerStopping);
        client.removeServerSavingListener(this.handleServerSaving);
        client.removeServerSavedListener(this.handleServerSaved);
        client.removeServerActivityListener(this.handleServerActivity);
        client.removeServerStatusListener(this.handleServerStatus);
        client.removePlayerJoinedListener(this.handlePlayerJoined);
        client.removePlayerLeftListener(this.handlePlayerLeft);
        client.removeOperatorAddedListener(this.handleOperatorAdded);
        client.removeOperatorRemovedListener(this.handleOperatorRemoved);
        client.removeAllowListAddedListener(this.handleAllowListAdded);
        client.removeAllowListRemovedListener(this.handleAllowListRemoved);
        client.removeIpBanAddedListener(this.handleIpBanAdded);
        client.removeIpBanRemovedListener(this.handleIpBanRemoved);
        client.removeBanAddedListener(this.handleBanAdded);
        client.removeBanRemovedListener(this.handleBanRemoved);
        client.removeGameRuleUpdatedListener(this.handleGameRuleUpdated);
    }


    render() {
        return html`<div>
            ${this.events.map(event => html`<p>${event}</p>`)}
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-logs": ServerLogsElement;
    }
}
