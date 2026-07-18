import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { ConsoleLogEvent } from "../mcsmp/mcmp.mjs";
import { client } from "../mcsmp/mcmp-client";

@customElement("mcsmp-logs")
class ServerLogsElement extends LitElement {
    @state()
    private events: ConsoleLogEvent[] = [];

    input_ref: Ref<HTMLInputElement> = createRef();

    addEvent = (event: ConsoleLogEvent) => {
        this.events = [...this.events, event];
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
        return html`<div class="console-event console-event-level-${event.level}">
            <span class="console-timestamp">${event.timestamp}<span> <span class="console-message">${event.message}</span>
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
        return html`<div>
            <div class="console-event-list">
                ${this.events.map(this.renderEvent)}
            </div>
            <div class="console-controls">
                <form @submit=${this.sendCommand}>
                    <input ${ref(this.input_ref)} />
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
