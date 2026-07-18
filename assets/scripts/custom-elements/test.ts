import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { client } from "../mcsmp/mcmp-client";
import { DiscoverResponse } from '../mcsmp/mcmp.mjs';

/**
 * Test element that shows the discover
 */
@customElement("mcsmp-test")
class TestElement extends LitElement {
    static styles = css`
    :host {
        height: 200px;
        overflow-y: auto;
    }
    `;

    @state()
    private discover: DiscoverResponse | null = null;

    render() {
        if(!this.discover) {
            return html`<p>loading...</p>`;
        }
        return html`<pre>${JSON.stringify(this.discover, null, 4)}</pre>`;
    }

    connectedCallback() {
        super.connectedCallback();
        client.discover().then(
            (response) => this.discover = response
        );
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-test": TestElement;
    }
}
