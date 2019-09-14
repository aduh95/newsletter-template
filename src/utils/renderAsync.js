import "./renderAsync.css";

const ASYNC_WRAPPER = "async-component";
const CONDITIONAL_WRAPPER = "conditional-element";

class ReplacableDocumentFragment extends DocumentFragment {
  #children = [];

  static from(frag) {
    const newFrag = new this.prototype.constructor();
    if (frag.childElementCount) {
      newFrag.#children = Array.from(frag.children);
      newFrag.append(frag);
    } else {
      const comment = document.createComment("empty fragment");
      newFrag.#children = [comment];
      newFrag.append(comment);
    }
    return newFrag;
  }

  replaceWith(element) {
    if (element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      const { length } = this.#children;
      const { childElementCount, children } = element;
      const newElements = Array.from(children);

      if (length > childElementCount) {
        this.#children.splice(childElementCount).forEach(el => el.remove());
      }
      this.#children.forEach((oldElement, i, a) => {
        oldElement.replaceWith((a[i] = newElements[i]));
      });

      for (let i = length; i < childElementCount; i++) {
        this.#children.push(newElements[i]);
        newElements[length].after(newElements[i]);
      }
    } else if (this.#children.length) {
      this.#children.pop().replaceWith(element);
      this.#children.forEach(el => el.remove());
      this.#children = [element];
    } else {
      throw new Error("Cannot replace empty fragment");
    }
  }
}

class AsyncElement extends HTMLElement {
  #domElement;
  #settled = false;

  _setElement(element) {
    if (this.#domElement) {
      this.#domElement.replaceWith(element);
    } else {
      this.#domElement = this.appendChild(element);
    }
  }

  placeholder(element) {
    if (this.#settled) return;
    this.classList.add("loading");
    this._setElement(element);
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

class ConditionalRendering extends AsyncElement {
  #states = {};
  #currentState;

  #_setElement = this._setElement.bind(this);

  async _setElement(element) {
    switch (typeof element) {
      case "undefined":
        break;

      case "string":
        super._setElement(document.createTextNode(element));
        break;

      case "function":
        await Promise.resolve(element.call(this)).then(this.#_setElement);
        break;

      default:
        if (element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          super._setElement(ReplacableDocumentFragment.from(element));
        } else if (element.nodeType > 0) {
          super._setElement(element);
        } else {
          await Promise.resolve(element).then(this.#_setElement);
        }
    }
  }

  defineStates(states) {
    return Object.assign(this.#states, states);
  }

  setState(state) {
    if (state !== this.#currentState) {
      this.#currentState = state;
      return this._setElement(this.#states[state]);
    }
  }
}

customElements.define(ASYNC_WRAPPER, AsyncElement);
customElements.define(CONDITIONAL_WRAPPER, ConditionalRendering);

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

export function conditionalRendering(
  states,
  setOfObservers,
  initialState,
  onError = Function.prototype
) {
  const wrapper = document.createElement(CONDITIONAL_WRAPPER);
  wrapper.dataset.contents = true;

  wrapper.defineStates(states);
  if (initialState !== undefined) {
    wrapper.setState(initialState);
  }

  if (setOfObservers) {
    setOfObservers.add(state => wrapper.setState(state).catch(onError));
  }

  return wrapper;
}
