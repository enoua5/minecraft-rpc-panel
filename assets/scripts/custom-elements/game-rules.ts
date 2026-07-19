import { customElement, state } from "lit/decorators.js";
import { LitElementWithAdpotedStyles } from "./lit-element-with-adpoted-styles";
import { client } from "../mcsmp/mcmp-client";
import { GameRuleValue, TypedGameRule } from "../mcsmp/mcmp.mjs";
import { css, html } from "lit";

@customElement("mcsmp-game-rules")
class GameRulesManagerElement extends LitElementWithAdpotedStyles {
    static styles = css`
        .wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: stretch;
            overflow: auto;
            gap: 1.5em;
        }
        .rule-wrapper {
            display: flex;
            align-items: flex-start;
            gap: 0.5em;
        }
        .rule-wrapper-boolean {
            flex-direction: row;
        }
        .rule-wrapper-integer {
            flex-direction: column-reverse;
        }
        .rule-with-update label {
            font-style: italic;
        }

        .buttons {
            display: flex;
            flex-direction: row;
            gap: 2em;
        }

        .change-count {
            font-style: italic;
        }
    `;

    @state()
    private game_rules: { [key: string]: TypedGameRule } = {};

    @state()
    private updates: { [key: string]: GameRuleValue | undefined } = {};

    @state()
    private loading_save: boolean = false;

    connectedCallback() {
        super.connectedCallback();
        client.getGamerules().then((rules) => {
            this.game_rules = {};
            for (const rule of rules) {
                this.game_rules[rule.key] = rule;
            }
        });
    }

    stageUpdate = (key: string, value: GameRuleValue | undefined) => {
        if (Number.isNaN(value)) {
            return;
        }

        const original_value = this.game_rules[key]?.value;

        if (original_value === value) {
            value = undefined;
        }

        // needs to be done like this so a change is notified
        this.updates = { ...this.updates, [key]: value };
    };

    cancelUpdates = () => {
        this.updates = {};

        this.shadowRoot?.querySelectorAll("input").forEach((input) => {
            const gamerule = this.game_rules[input.name];
            if (gamerule.type === "boolean") {
                input.checked = gamerule.value;
            } else {
                input.value = String(gamerule.value);
            }
        });
    };

    saveUpdates = () => {
        this.loading_save = true;
        Promise.all(
            Object.entries(this.updates)
                .filter(
                    (row): row is [string, GameRuleValue] => row[1] != undefined
                )
                .map(([key, value]) =>
                    client
                        .updateGamerules({
                            key,
                            value,
                        })
                        .then((updated_rule) => {
                            this.game_rules[updated_rule.key] = updated_rule;
                        })
                )
        ).finally(() => {
            this.loading_save = false;
            // to reset the form
            this.cancelUpdates();
        });
    };

    renderGameRule = (rule: TypedGameRule) => {
        const input_id = `gamerule-${rule.key}`;
        const updated_value = this.updates[rule.key];
        const original_value = rule.value;
        const value = updated_value ?? original_value;
        const has_update = updated_value != undefined;

        return html`
            <div
                class="rule-wrapper rule-wrapper-${rule.type} rule-${has_update ? "with" : "without"}-update"
            >
                ${
                    rule.type === "boolean"
                        ? html`<input
                              type="checkbox"
                              ?checked=${value as boolean}
                              id=${input_id}
                              name=${rule.key}
                              @change=${(e: InputEvent) => this.stageUpdate(rule.key, (e.currentTarget as HTMLInputElement).checked)}
                          />`
                        : html`<input
                              type="number"
                              value=${value as number}
                              id=${input_id}
                              name=${rule.key}
                              @change=${(e: InputEvent) => this.stageUpdate(rule.key, (e.currentTarget as HTMLInputElement).valueAsNumber)}
                          />`
                }
                <label for=${input_id}
                    >${rule.key.replace(/^minecraft:/, "")}</label
                >
            </div>
        `;
    };

    render() {
        const update_count = Object.values(this.updates).filter(
            (update) => update != undefined
        ).length;

        return html`
            <div class="wrapper">
                ${Object.values(this.game_rules)
                    .sort((a, b) => a.key.localeCompare(b.key))
                    .map(this.renderGameRule)}
                <p class="change-count">
                    ${
                        this.loading_save
                            ? "updating..."
                            : `${update_count} gamerule update${update_count === 1 ? "" : "s"} staged`
                    }
                </p>
                <div class="buttons">
                    <button
                        ?disabled=${update_count === 0 || this.loading_save}
                        @click=${this.saveUpdates}
                    >
                        Save
                    </button>
                    <button
                        ?disabled=${update_count === 0 || this.loading_save}
                        style="--button-bg: var(--color-unimportant)"
                        @click=${this.cancelUpdates}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "mcsmp-game-rules": GameRulesManagerElement;
    }
}
