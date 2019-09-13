import { Component } from "./preact.js";
import { renderAsync } from "./renderAsync.js";

const STATEFUL_ELEMENT_NAME = "stateful-element";

class StatefulElement extends HTMLElement {
  #previouslyDisconnected = true;
  #unmountCallback = Function.prototype;
  #mountCallback = Function.prototype;

  replaceCurrentElement(newElement) {
    if (this.childElementCount) {
      this.firstChild.replaceWith(newElement);
    } else {
      this.append(newElement);
    }
  }

  observeElementLifecycle(onMount, onUnmount) {
    this.#mountCallback = onMount;
    this.#unmountCallback = onUnmount;
  }

  connectedCallback() {
    if (this.#previouslyDisconnected && this.isConnected) {
      this.#previouslyDisconnected = false;
      this.#mountCallback(this);
    }
  }

  disconnectedCallback() {
    this.#unmountCallback(this);
    this.#previouslyDisconnected = true;
  }
}
customElements.define(STATEFUL_ELEMENT_NAME, StatefulElement);

/**
 * Somewhat compatible with React/preact Component API.
 * However, it is vastly less efficient because no virtual DOM is being used, which
 * means all the nodes from the render function have to be recreated at each render.
 */
export class StatefulComponent extends Component {
  #domElement;
  #state = {};

  get state() {
    return Object.assign({}, this.#state);
  }

  set state(newState) {
    return Object.assign(this.#state, newState);
  }

  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  forceUpdate() {
    this.render().then(element =>
      this.#domElement.replaceCurrentElement(element)
    );
    this.componentDidUpdate();
  }
  setState(newState, callback = Function.prototype) {
    callback(Object.assign(this.#state, newState));
    this.forceUpdate();
    if (this.placeholder && this.#domElement.isConnected) {
      this.#domElement.replaceCurrentElement(this.placeholder);
    }
  }

  _render() {
    this.#domElement = document.createElement(STATEFUL_ELEMENT_NAME);
    this.#domElement.dataset.contents = true;
    this.#domElement.observeElementLifecycle(
      this.componentDidMount.bind(this),
      this.componentWillUnmount.bind(this)
    );
    this.forceUpdate();
    return this.#domElement;
  }
}
