import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { ConsoleLogEvent } from "../mcsmp/mcmp.mjs";
import { client } from "../mcsmp/mcmp-client";

@customElement("mcsmp-logs")
class ServerLogsElement extends LitElement {
    static styles = css`
        .console-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5em;
            height: 100%;
        }
        .console-event-list {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column-reverse;
            gap: 0.25em;
            font-family: var(--event-font);
        }
        .console-controls form {
            display: flex;
            flex-direction: row;
            gap: 1em;
        }
        .console-controls form input[type="text"] {
            flex: 1;
        }
        .console-event-info {
            color: var(--color-unimportant, grey)
        }
        .console-event-info::before {
            content: "[";
        }
        .console-event-info::after {
            content: "]";
        }

        .console-event-level-trace {
            color: var(--color-unimportant, grey);
        }
        .console-event-level-debug {
            color: var(--color-debug, blue);
        }
        .console-event-level-info {
            color: var(--color-text, inherit);
        }
        .console-event-level-warn {
            color: var(--color-warn, yellow);
        }
        .console-event-level-error {
            color: var(--color-error, red);
        }
        .console-event-level-fatal {
            color: var(--color-error, red);
        }
    `;

    @state()
    private events: ConsoleLogEvent[] = [];

    input_ref: Ref<HTMLInputElement> = createRef();

    addEvent = (event: ConsoleLogEvent) => {
        this.events = [event, ...this.events];
    };

    connectedCallback() {
        super.connectedCallback();
        client.addLogEventListener(this.addEvent);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        client.removeLogEventListener(this.addEvent);
    }

    renderEvent(event: ConsoleLogEvent) {
        return html`<div
            class="console-event console-event-level-${event.level.toLowerCase()}"
        >
            <span class="console-event-info"
                ><span class="console-timestamp">${event.timestamp}</span>
                <span class="console-level">${event.level}</span></span
            >
            <span class="console-message">${event.message}</span>
        </div>`;
    }

    async sendCommand(e: Event) {
        e.preventDefault();

        if (!this.input_ref.value) {
            return;
        }

        const command = this.input_ref.value.value;
        this.input_ref.value.value = "";

        if (command) {
            await client.runCommand({ command });
        }
    }

    render() {
        return html`<div class="console-wrapper">
            <div class="console-event-list">
                ${this.events.map(this.renderEvent)}
            </div>
            <div class="console-controls">
                <form @submit=${this.sendCommand}>
                    <input type="text" ${ref(this.input_ref)} />
                    <input type="submit" value="send" />
                </form>
            </div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-logs": ServerLogsElement;
    }
}
