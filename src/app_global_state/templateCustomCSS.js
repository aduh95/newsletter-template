import Observable from "./Observable.js";

export default new (class TemplateCustomCSS extends Observable {
  #currentCSS;
  #DOMNodeStyle;

  #updateCustomCSS = css => {
    this.#DOMNodeStyle.data = css;
  };

  constructor() {
    super();
    const style = document.createElement("style");
    this.#DOMNodeStyle = document.createTextNode("");
    style.dataset.export = true;
    style.appendChild(this.#DOMNodeStyle);
    document.head.appendChild(style);
    this.subscribe(this.#updateCustomCSS);
  }

  set(css) {
    if (css !== this.#currentCSS) {
      this.#currentCSS = css;
      this.notify(css);
    }
  }

  get() {
    return this.#currentCSS;
  }
})();
