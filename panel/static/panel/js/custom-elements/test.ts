import { html } from "./html-template.js";
import { client } from "../mcmp-client.js";

class TestElement extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = html` <p>loading...</p> `;
        client.discover().then(
            (response) =>
                (shadow.innerHTML = html`<pre>
${JSON.stringify(response, null, 4)}
</pre>`)
        );
    }
}

customElements.define("mcsmp-test", TestElement);
