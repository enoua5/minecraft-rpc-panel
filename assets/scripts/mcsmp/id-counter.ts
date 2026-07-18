export class IdCounter {
    #nextId = 1;

    get id() {
        return this.#nextId++;
    }
}
