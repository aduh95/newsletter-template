import { h, Component, Fragment } from "preact";

import ReOrderComponents from "./ReOrderComponents.js";
import MenuBar from "./MenuBar.js";
import LoadingDialog from "../LoadingDialog.js";

export default class Editor extends Component {
  #observer = new window.MutationObserver(this.handleMutation.bind(this));
  #DOMData = new WeakMap();
  #letSNotBuildTheDOMAgain = false;
  #waitForHistoryRewind = false;

  state = { hasError: false, showControls: false, reOrder: false };

  get data() {
    return this.#DOMData.get(this);
  }

  /**
   * Commits current DOM as App's state
   */
  commitChanges() {
    this.#letSNotBuildTheDOMAgain = true; // changes could be overridden by a render
    this.props.onChange(this.data);
  }

  forceToReRender() {
    this.#waitForHistoryRewind = true;
    this.forceUpdate();
  }

  /**
   * @param {MutationRecord[]} mutationList
   * @param {MutationObserver} observer
   */
  handleMutation(mutationList, observer) {
    let rebuildDOM = false;
    let hasAnythingChanged = false;
    const data = this.#DOMData;
    for (const mutation of mutationList) {
      const { target, type } = mutation;
      switch (type) {
        case "childList":
          const { addedNodes, removedNodes, nextSibling } = mutation;
          if (addedNodes.length) {
            Array.from(addedNodes).forEach(node => {
              if (node.dataset.ignore) {
                return;
              }
              if (!data.has(node)) {
                this.observeNode(node);
              }
              if (nextSibling && data.has(nextSibling)) {
                console.log("add in between", node);
                const content = data.get(target)?.content;
                const index = content?.indexOf(data.get(nextSibling));
                if (content && index !== -1) {
                  content.splice(index, 0, data.get(node));
                }
              } else {
                console.log("append", node);
                data.get(target)?.content.push(data.get(node));
              }
              hasAnythingChanged = true;
              if (node.dataset.requestRender) {
                rebuildDOM = true;
              }
            });
          }
          if (removedNodes.length) {
            Array.from(removedNodes).forEach(node => {
              if (node.dataset.ignore) {
                return;
              }
              console.log("remove", node);
              const content = data.get(target)?.content;
              const index = content?.indexOf(data.get(node));
              if (content && index !== -1) {
                content.splice(index, 1);
              }
              hasAnythingChanged = true;
            });
          }
          break;

        case "characterData":
          let parent = target;
          while (parent.parentElement.isContentEditable) {
            parent = parent.parentElement;
          }
          const { dataset, textContent } = parent;

          while (!this.#DOMData.has(parent)) {
            parent = parent.parentElement;
          }

          this.#DOMData.get(parent)[dataset.key] = textContent;
          hasAnythingChanged = true;
          break;

        case "attributes":
          if (mutation.attributeName === "data-json") {
            const obj = this.#DOMData.get(target);

            Object.keys(obj).forEach(key => {
              obj[key] = undefined;
            });
            Object.assign(obj, JSON.parse(target.dataset.json));
            hasAnythingChanged = true;
            rebuildDOM = true;
          }
          break;
      }
    }

    if (hasAnythingChanged) {
      this.props.onChange(data.get(this), rebuildDOM);
    }
  }

  observeNode(node) {
    const { ignore, type, json } = node.dataset;

    if (ignore) {
      return;
    }

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
    if (this.#DOMData.has(node)) {
      // No op, node has already been taken care of
    } else if (node.dataset.contents) {
      Array.from(node.children, this.observeNodeDeep.bind(this));
    } else if (node.dataset.type) {
      this.observeNode(node);
      this.#DOMData.get(this)[node.dataset.type] = this.#DOMData.get(
        node
      )?.content;
    } else {
      this.#DOMData.set(node, "ignore");
    }
  }

  componentDidMount() {
    console.log("mount");
    this.#DOMData.set(this, {});
    requestIdleCallback(this.checkForDOMChanges.bind(this));
  }

  checkForDOMChanges() {
    console.log("updated");
    for (const node of document.querySelectorAll("[data-export]")) {
      this.observeNodeDeep(node);
    }
  }

  shouldComponentUpdate() {
    if (this.#letSNotBuildTheDOMAgain) {
      return (this.#letSNotBuildTheDOMAgain = false);
    }
  }

  componentDidUpdate() {
    this.#waitForHistoryRewind = false;
    requestIdleCallback(this.checkForDOMChanges.bind(this));
  }

  componentWillUnmount() {
    console.log("unmount");
    this.#observer.disconnect();
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.warn(error, info);
  }

  render() {
    console.log("render");
    return (
      <>
        <header>
          <h1>{this.props.title}</h1>
          <MenuBar editor={this} />
        </header>
        {this.state.reOrder ? <ReOrderComponents /> : null}
        {this.#waitForHistoryRewind ? (
          <div
            style={{
              height: CSS.px(document.querySelector("main")?.offsetHeight),
            }}
          >
            <LoadingDialog />
          </div>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}
