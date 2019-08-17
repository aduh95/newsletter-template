import Observable from "./Observable.js";

const DEFAULT_TITLE = "No template selected";

export default new (class TemplateName extends Observable {
  #currentName;
  #DOMNodeTitleForTemplateName;

  #updatePageTile = name => {
    this.#DOMNodeTitleForTemplateName.data = name;
  };

  constructor() {
    super();
    const savedNameBeforePanic = sessionStorage.getItem(this.constructor.name);
    if (savedNameBeforePanic) {
      sessionStorage.removeItem(this.constructor.name);
      this.#DOMNodeTitleForTemplateName = document.createTextNode(
        savedNameBeforePanic
      );
    } else {
      this.#DOMNodeTitleForTemplateName = document.createTextNode(
        DEFAULT_TITLE
      );
    }
    document.head
      .querySelector("title")
      .append(" - ", this.#DOMNodeTitleForTemplateName);
    this.subscribe(this.#updatePageTile);
  }

  set(name) {
    this.#currentName = name;
    this.notify(this.#currentName);
  }

  get() {
    return this.#currentName;
  }

  /**
   * @throws When sessionStorage is not available
   */
  panic() {
    sessionStorage.setItem(this.constructor.name, this.#currentName);
  }
})();
