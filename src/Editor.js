import { h, Component, Fragment, createRef } from "preact";

import ReOrderComponents from "./ReOrderComponents.js";
import Save from "./Save.js";

export default class Editor extends Component {
  #observer = new window.MutationObserver(this.handleMutation.bind(this));
  #DOMData = new WeakMap();

  state = { hasError: false, showControls: false, reOrder: false };

  get data() {
    return this.#DOMData.get(this);
  }

  /**
   * @param {MutationRecord[]} mutationList
   * @param {MutationObserver} observer
   */
  handleMutation(mutationList, observer) {
    const data = this.#DOMData;
    for (const mutation of mutationList) {
      const { target, type } = mutation;
      switch (type) {
        case "childList":
          const { addedNodes, removedNodes, nextSibling } = mutation;
          if (addedNodes.length) {
            Array.from(addedNodes).forEach(node => {
              console.log("add", node);
              if (!data.has(node)) {
                this.observeNode(node);
              }
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
          if (removedNodes.length) {
            Array.from(removedNodes).forEach(node => {
              console.log("remove", node);
              const content = data.get(target)?.content;
              const index = content?.indexOf(data.get(node));
              if (content && index !== -1) {
                content.splice(index, 1);
              }
            });
          }
          break;

        case "characterData":
          let parent = target;
          while (parent.parentElement.isContentEditable) {
            parent = parent.parentElement;
          }
          const { dataset, textContent } = parent;
          console.log(parent);

          while (!this.#DOMData.has(parent)) {
            parent = parent.parentElement;
          }
          console.log(parent);
          this.#DOMData.get(parent)[dataset.key] = textContent;
          break;

        case "attributes":
          if (mutation.attributeName === "data-json") {
            const obj = this.#DOMData.get(target);

            Object.keys(obj).forEach(key => {
              obj[key] = undefined;
            });
            Object.assign(obj, JSON.parse(target.dataset.json));
          }
          break;
      }
    }
    console.log(data.get(this));
    this.props.onChange(data.get(this));
  }

  observeNode(node) {
    const { type, json } = node.dataset;

    if (json) {
      this.#observer.observe(node, { attributes: true });
      return this.#DOMData.set(node, JSON.parse(json));
    }

    if (type) {
      this.#observer.observe(node, { childList: true });
      this.#DOMData.set(node, { type, content: [] });
    }

    if (node.childElementCount) {
      Array.from(node.children).forEach(child => {
        const { ignore, key } = child.dataset;
        if (ignore) {
          // if ignore attribute is on the node, do nothing
        } else if (key) {
          Array.from(child.childNodes).forEach(el =>
            this.#observer.observe(el, { characterData: true })
          );
          this.#DOMData.get(node)[key] = child.textContent;
          child.contentEditable = true;
        } else {
          this.observeNode(child);
          this.#DOMData.get(node)?.content?.push(this.#DOMData.get(child));
        }
      });
    }
  }

  observeNodeDeep(node) {
    if (node.dataset.contents) {
      return Array.from(node.children, this.observeNodeDeep.bind(this));
    }
    this.observeNode(node);
    this.#DOMData.get(this)[node.dataset.type] = this.#DOMData.get(
      node
    )?.content;
  }

  componentDidMount() {
    this.#DOMData.set(this, {});
    requestIdleCallback(this.checkForDOMChanges.bind(this));
  }

  checkForDOMChanges() {
    console.log("updated");
    for (const node of document.querySelectorAll("[data-watch]")) {
      if (!this.#DOMData.has(node)) {
        this.observeNodeDeep(node);
      }
    }
  }

  componentDidUpdate() {
    requestIdleCallback(() => this.checkForDOMChanges());
  }

  componentWillUnmount() {
    this.#observer.disconnect();
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.warn(error, info);
  }

  render() {
    for (const child of this.props.children) {
      child.props["data-watch"] = true;
    }
    return (
      <>
        <header>
          <h1>{this.props.title}</h1>
          <Save editor={this} />
        </header>
        {this.state.reOrder ? <ReOrderComponents /> : null}
        {this.props.children}
      </>
    );
  }
}
