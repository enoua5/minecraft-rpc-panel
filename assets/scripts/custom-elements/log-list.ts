import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import {  ConsoleLogEvent } from "../mcsmp/mcmp.mjs";
import { client } from "../mcsmp/mcmp-client";

@customElement("mcsmp-logs")
class ServerLogsElement extends LitElement {
    @state()
    private events: ConsoleLogEvent[] = [];

    addEvent = (event: ConsoleLogEvent) => {
        this.events = [...this.events, event];
    }

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
        </div>`
    }

    render() {
        return html`<div>
            ${this.events.map(this.renderEvent)}
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-logs": ServerLogsElement;
    }
}
