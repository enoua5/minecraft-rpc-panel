import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { AllowlistResult, Player } from "../mcsmp/mcmp.mjs";
import { client } from "../mcsmp/mcmp-client";

@customElement("mcsmp-allow-list")
class AllowListElement extends LitElement {
    @state()
    private allow_list: AllowlistResult | null = null;

    private handleAllowListAdded = (player: Player) => {
        this.allow_list = [...(this.allow_list ?? []), player];
    };

    private handleAllowListRemoved = (player: Player) => {
        this.allow_list = (this.allow_list ?? []).filter((p) => {
            if (p.id != null && player.id != null && player.id === p.id) {
                return false;
            }
            if (
                p.name != null &&
                player.name != null &&
                player.name === p.name
            ) {
                return false;
            }
            return true;
        });
    };

    connectedCallback() {
        super.connectedCallback();
        client.getAllowList().then((result) => (this.allow_list = result));
        client.addAllowListAddedListener(this.handleAllowListAdded);
        client.addAllowListRemovedListener(this.handleAllowListRemoved);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        client.removeAllowListAddedListener(this.handleAllowListAdded);
        client.removeAllowListRemovedListener(this.handleAllowListRemoved);
    }

    renderPlayer(player: Player) {
        return html`<li>${player.name ?? player.id}</li>`;
    }

    renderPlayerList() {
        if (!this.allow_list) {
            return html`<p>loading</p>`;
        }
        return html`<ul>
            ${this.allow_list.map(this.renderPlayer)}
        </ul>`;
    }

    async addPlayer() {
        await client.setAllowList([{ name: "enoua5" }]);
    }

    async removePlayer() {
        await client.setAllowList([]);
    }

    render() {
        return html`<div>
            ${this.renderPlayerList()}
            <button @click=${this.addPlayer}>Add player</button>
            <button @click=${this.removePlayer}>Remove player</button>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-allow-list": AllowListElement;
    }
}
