import Observable from "./Observer.js";

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
    style.appendChild(this.#DOMNodeStyle);
    document.head.appendChild(style);
    this.subscribe(this.#updateCustomCSS);
  }

  set(css) {
    this.#currentCSS = css;
    this.notify(() => css);
  }

  get() {
    return this.#currentCSS;
  }
})();
