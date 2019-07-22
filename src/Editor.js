import { h, Component, Fragment, createRef } from "preact";

import ReOrderComponents from "./ReOrderComponents.js";
import Save from "./Save.js";
import Error from "./Error.js";

const mutationObserverOptions = {
  childList: true,
  characterData: true,
  subtree: true,
};

export default class Editor extends Component {
  #observer = new window.MutationObserver(this.handleMutation.bind(this));
  #childrenRefs = new WeakMap();

  #beforeRef = createRef();
  #afterRef = createRef();

  state = { hasError: false, showControls: false, reOrder: true };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.warn(error);
    return { hasError: true };
  }

  /**
   * @param {MutationRecord[]} mutationList
   * @param {MutationObserver} observer
   */
  handleMutation(mutationList, observer) {
    const data = this.#childrenRefs;
    const filterNodes = el => el.dataset.name !== undefined;
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        const { target } = mutation;
        if (target.dataset.name !== undefined) {
          const log = { target };
          if (mutation.addedNodes.length) {
            Array.from(mutation.addedNodes)
              .filter(filterNodes)
              .forEach(node => {
                if (!data.has(node)) {
                  const { name } = node.dataset;
                  data.set(node, { name, content: [] });
                }
                const { nextSibling } = mutation;
                if (nextSibling) {
                  const content = data.get(target)?.content;
                  const index = content?.indexOf(data.get(nextSibling));
                  if (content && index !== -1) {
                    content.splice(index, 0, data.get(node));
                  }
                } else {
                  data.get(target)?.content.push(data.get(node));
                }
              });
          }
          if (mutation.removedNodes.length) {
            Array.from(mutation.removedNodes)
              .filter(filterNodes)
              .forEach(node => {
                const content = data.get(target)?.content;
                const index = content?.indexOf(data.get(node));
                if (content && index !== -1) {
                  content.splice(index, 1);
                }
              });
          }
        }
      }
    }
    console.log(data.get(this));
  }

  observeNode(node) {
    const { name } = node.dataset;

    if (name) {
      this.#observer.observe(node, mutationObserverOptions);
      this.#childrenRefs.set(node, { name, content: [] });
      this.#childrenRefs.get(this)[node.dataset.name] = this.#childrenRefs.get(
        node
      );
    }
  }

  componentDidMount() {
    this.#childrenRefs.set(this, {});
    let node = this.#beforeRef.current.nextElementSibling;
    while (node && node !== this.#afterRef.current) {
      if (node.childElementCount) {
        Array.from(node.children).forEach(node => this.observeNode(node));
      } else {
        this.observeNode(node);
      }
      node = node.nextElementSibling;
    }
  }

  componentWillUnmount() {
    this.#observer.disconnect();
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.warn(error, info);
  }

  render() {
    return this.state.hasError ? (
      <Error />
    ) : (
      <>
        <header ref={this.#beforeRef}>
          <h1>{this.props.title}</h1>
        </header>
        {this.state.reOrder ? <ReOrderComponents /> : null}
        {this.props.children}
        <footer ref={this.#afterRef}>
          <Save />
        </footer>
      </>
    );
  }
}
