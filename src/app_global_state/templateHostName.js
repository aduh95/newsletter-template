import Observable from "./Observable.js";

export default new (class TemplateHostName extends Observable {
  #currentName;

  set(name) {
    if (name !== this.#currentName) {
      try {
        this.#currentName = new URL(name || "about:blank").hostname;
      } catch (e) {
        console.warn(e);
        this.#currentName = "";
      }
      this.notify(this.#currentName);
    }
  }

  get() {
    return this.#currentName;
  }

  getAsURL() {
    return this.#currentName
      ? new URL(`${location.protocol}//${this.#currentName}`)
      : null;
  }

  getHostNameRegExp(flags) {
    return new RegExp(`(https?:)?//${this.#currentName}/?`, flags);
  }
})();
