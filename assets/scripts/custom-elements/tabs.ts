import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LitElementWithAdpotedStyles } from "./lit-element-with-adpoted-styles";

@customElement("tab-pane")
class TabPaneElement extends LitElement {
    static styles = css`
        .wrapper {
            width: 100%;
            height: 100%;
        }
        .hidden {
            display: none;
        }
    `;

    @property({ type: Boolean })
    public shown = false;
    @property({ type: String })
    public name: string | null = null;

    render() {
        return html`<div class="wrapper ${this.shown ? "shown" : "hidden"}">
            <slot></slot>
        </div>`;
    }
}

// NOTE order is important here
// `TabPaneElement` needs to be defined within `TabMenuElement`

@customElement("tab-menu")
class TabMenuElement extends LitElementWithAdpotedStyles {
    static styles = css`
        .wrapper {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            gap: 0.5em;
        }

        .selected {
            --button-bg: color-mix(in oklab, var(--color-primary), black);
        }
    `;

    @property({
        converter: {
            fromAttribute: (value) => value?.split(",") ?? [],
            toAttribute: (value) => {
                if (Array.isArray(value)) {
                    return value.join(",");
                }
                if (typeof value === "string" || value == null) {
                    return value ?? null;
                }
                return String(value);
            },
        },
    })
    public tabs: string[] = [];

    @property({ type: String })
    public shown: string | null = null;

    setActivePane(tab: string | null) {
        [...document.getElementsByTagName("tab-pane")].forEach((pane) => {
            pane.shown = pane.name === tab;
        });
    }

    setShown = (tab: string) => {
        this.shown = tab;
        this.setActivePane(tab);
    };

    attributeChangedCallback(
        name: string,
        _old: string | null,
        value: string | null
    ): void {
        super.attributeChangedCallback(name, _old, value);

        if (name === "shown") {
            this.setActivePane(value);
        }
    }

    renderOption = (tab: string) => {
        return html`
            <button
                class="option ${tab === this.shown ? "selected" : "unselected"}"
                @click=${() => this.setShown(tab)}
            >
                ${tab}
            </button>
        `;
    };

    render() {
        return html`
            <div class="wrapper">${this.tabs.map(this.renderOption)}</div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "tab-menu": TabMenuElement;
        "tab-pane": TabPaneElement;
    }
}
