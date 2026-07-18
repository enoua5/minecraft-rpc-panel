import { css, html, LitElement, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ServerState } from "../mcsmp/mcmp.mjs";
import { client } from "../mcsmp/mcmp-client";

@customElement("mcsmp-server-status")
class ServerStatusElement extends LitElement {
    static styles = css`
        .wrapper {
            display: flex;
            flex-direction: row;
            gap: 2ch;
            width: 100%;
            height: 100%;
            align-items: center;
        }

        .started-indicator {
            width: 0.5em;
            height: 0.5em;
            border-radius: 100%;
        }
        .started-indicator-started {
            background-color: green;
        }
        .started-indicator-stopped {
            background-color: red;
        }
    `;

    @state()
    private server_state: ServerState | null = null;

    handleHeartbeat = (state: ServerState) => {
        this.server_state = state;
    };

    connectedCallback() {
        super.connectedCallback();
        client.getServerStatus().then((result) => {
            this.server_state = result;
        });
        client.setStatusHeartbeatInterval(5);
        client.addServerStatusListener(this.handleHeartbeat);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        client.setStatusHeartbeatInterval(0);
        client.removeServerStatusListener(this.handleHeartbeat);
    }

    renderServerState(server_state: ServerState) {
        const player_count = (server_state.players ?? []).length;

        return html`
            <div
                class="started-indicator started-indicator-${server_state.started ? "started" : "stopped"}"
            ></div>
            <span>Version ${server_state.version.name}</span>
            <span
                >${player_count} player${player_count === 1 ? "" : "s"}
                online</span
            >
        `;
    }

    render() {
        return html`<div class="wrapper">
            ${this.renderServerState(
                this.server_state ?? {
                    started: false,
                    version: { name: "---", protocol: 0 },
                }
            )}
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-server-status": ServerStatusElement;
    }
}
