import Observable from "./Observer.js";

export default new (class TemplateHostName extends Observable {
  #currentName;

  set(name) {
    this.#currentName = name;
    this.notify(() => this.#currentName);
  }

  get() {
    return this.#currentName;
  }

  getHostNameRegExp(flags) {
    return new RegExp(`(https?:)?//${this.#currentName}/?`, flags);
  }
})();
