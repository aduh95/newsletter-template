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
 * @param {Promise<Node>} asyncElement Async element
 * @param {ChildNode|Promise<ChildNode>} placeholder Node to be displayed until the element settle
 * @param {ChildNode|Promise<ChildNode>} fallback Node to display in case the promise is rejected
 * @return {ChildNode}
 */
export function renderAsync(asyncElement, placeholder = {}, fallback = null) {
  const wrapper = document.createElement(ASYNC_WRAPPER);
  const { prototype } = AsyncElement;

  if (placeholder.then) {
    placeholder.then(prototype.placeholder.bind(wrapper)).catch(console.warn);
  } else if (placeholder.replaceWith) {
    wrapper.placeholder(placeholder);
  }

  asyncElement.then(prototype.commit.bind(wrapper)).catch(err => {
    console.error(err);
    Promise.resolve(fallback)
      .then(fallback => wrapper.commit(fallback))
      .catch(() => {
        wrapper.remove();
      });
  });
  return wrapper;
}
