export class IdCounter {
    #next_id = 1;

    get id() {
        return this.#next_id++;
    }
}
