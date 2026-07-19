import type { Player } from "../mcsmp/mcmp.mjs";

export function playerEq(a: Player, b: Player) {
    if (a.id != undefined && b.id != undefined && a.id === b.id) {
        return true;
    }
    if (a.name != undefined && b.name != undefined && a.name === b.name) {
        return true;
    }
    return false;
}
