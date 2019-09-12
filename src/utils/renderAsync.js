import "./renderAsync.css";

const ASYNC_WRAPPER = "async-component";

class AsyncElement extends HTMLElement {
  #domElement;
  #settled = false;

  placeholder(element) {
    if (this.#settled) return;
    this.classList.add("loading");
    if (this.#domElement) {
      this.#domElement.replaceWith(element);
    } else {
      this.#domElement = this.appendChild(element);
    }
  }

  commit(element) {
    if (this.#settled) return;
    this.classList.remove("loading");
    if (this.#domElement) {
      this.#domElement.replaceWith(element);
    } else {
      this.append(element);
    }
    this.#settled = true;
    this.#domElement = null;
  }
}

customElements.define(ASYNC_WRAPPER, AsyncElement);

/**
 * @callback errorCallback
 * @param {Error} error
 * @returns {Node|string|Promise<Node|string>} fallbackElement
 */

/**
 * @param {Promise<Node|string>} asyncElement Async element
 * @param {ChildNode|Promise<ChildNode>} placeholder Node to be displayed until the element settle
 * @param {errorCallback} fallback Node to display in case the promise is rejected
 * @return {ChildNode}
 */
export function renderAsync(asyncElement, placeholder = {}, fallback = null) {
  const wrapper = document.createElement(ASYNC_WRAPPER);
  const { prototype } = AsyncElement;
  wrapper.dataset.contents = true;

  if (placeholder.then) {
    placeholder.then(prototype.placeholder.bind(wrapper)).catch(console.warn);
  } else if (placeholder.replaceWith) {
    wrapper.placeholder(placeholder);
  }

  asyncElement
    .then(prototype.commit.bind(wrapper))
    .catch(fallback)
    .then(prototype.commit.bind(wrapper))
    .catch(() => {
      wrapper.remove();
    });

  return wrapper;
}
