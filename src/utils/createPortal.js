import "./createPortal.css";

const PORTAL_ELEMENT_NAME = "dom-portal";

class Portal extends HTMLElement {
  #domElement;
  #parent;

  attach(element, parent) {
    this.#domElement = parent.appendChild(element);
    this.#domElement.append(...this.children);
    this.#parent = parent;
  }

  append(...children) {
    return this.#domElement
      ? this.#domElement.append(...children)
      : super.append(...children);
  }
  appendChild(child) {
    return this.#domElement
      ? this.#domElement.appendChild(child)
      : super.appendChild(child);
  }

  connectedCallback() {
    if (this.#parent && this.#domElement && this.isConnected) {
      this.#parent.append(this.#domElement);
    }
  }

  disconnectedCallback() {
    if (this.#domElement?.isConnected) {
      this.#domElement.remove();
    }
  }
}

customElements.define(PORTAL_ELEMENT_NAME, Portal);

/**
 * @param {Promise<Node>} asyncElement Async element
 * @param {ParentNode|Promise<ParentNode>} parent Node to be displayed until the element settle
 * @param {Function} callback
 * @return {ChildNode}
 */
export function createPortal(asyncElement, parent, callback = null) {
  const portal = document.createElement(PORTAL_ELEMENT_NAME);
  portal.dataset.contents = true;

  Promise.resolve(asyncElement).then(element => {
    portal.attach(element, parent);
    if ("function" === typeof callback) {
      requestAnimationFrame(callback);
    }
  });

  return portal;
}
