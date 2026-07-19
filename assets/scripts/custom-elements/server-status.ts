import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ServerState } from "../mcsmp/mcmp.mjs";
import { client } from "../mcsmp/mcmp-client";
import { LitElementWithAdpotedStyles } from "./lit-element-with-adpoted-styles";

@customElement("mcsmp-server-status")
class ServerStatusElement extends LitElementWithAdpotedStyles {
    static styles = css`
        .wrapper {
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: space-between;
        }

        .status {
            display: flex;
            flex-direction: row;
            gap: 2ch;
            height: 100%;
            align-items: center;
        }

        .controls {
            display: flex;
            flex-direction: row;
            gap: 2ch;
            height: 100%;
            align-items: center;
        }

        .controls button {
            padding: 0.6em;
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

        .stop {
            --button-bg: var(--color-danger);
        }
    `;

    @state()
    private server_state: ServerState | null = null;

    handleHeartbeat = (state: ServerState) => {
        this.server_state = state;
    };

    handleStop = () => {
        this.server_state = this.server_state && {
            ...this.server_state,
            started: false,
            players: [],
        };
    };

    connectedCallback() {
        super.connectedCallback();
        client.getServerStatus().then((result) => {
            this.server_state = result;
        });
        client.setStatusHeartbeatInterval(5);
        client.addServerStatusListener(this.handleHeartbeat);
        client.addServerStoppingListener(this.handleStop);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        client.setStatusHeartbeatInterval(0);
        client.removeServerStatusListener(this.handleHeartbeat);
        client.removeServerStoppingListener(this.handleStop);
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

    saveServer() {
        client.saveServer(false);
    }

    stopServer() {
        if (
            confirm(
                "Are you sure you want to stop the server? You will have to ssh back in to restart it."
            )
        ) {
            client.stopServer();
        }
    }

    render() {
        return html`<div class="wrapper">
            <div class="status">
                ${this.renderServerState(
                    this.server_state ?? {
                        started: false,
                        version: { name: "---", protocol: 0 },
                    }
                )}
            </div>
            <div class="controls">
                <button class="save" @click=${this.saveServer}>Save</button>
                <button class="stop" @click=${this.stopServer}>Stop</button>
            </div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-server-status": ServerStatusElement;
    }
}
