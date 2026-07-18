import { LitElement } from "lit";

export class LitElementWithAdpotedStyles extends LitElement {
    connectedCallback() {
        super.connectedCallback();

        Promise.all(
            [...document.querySelectorAll('link[rel="stylesheet"]')].map(
                async (link) => {
                    const css = await fetch(
                        (link as HTMLLinkElement).href
                    ).then((r) => r.text());
                    const sheet = new CSSStyleSheet();
                    sheet.replaceSync(css);
                    return sheet;
                }
            )
        ).then((linkSheets) => {
            (this.shadowRoot as ShadowRoot).adoptedStyleSheets = [
                ...(this.shadowRoot as ShadowRoot).adoptedStyleSheets,
                ...linkSheets,
            ];
        });
    }
}
