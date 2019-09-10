const PORTAL_ELEMENT_NAME = "dom-portal";

class Portal extends HTMLElement {
  #domElement;

  attach(element, parent) {
    this.#domElement = parent.appendChild(element);
  }

  remove() {
    super.remove();
    this.#domElement.remove();
  }
}

customElements.define(PORTAL_ELEMENT_NAME, Portal);

/**
 * @param {Promise<Node>} asyncElement Async element
 * @param {ParentNode|Promise<ParentNode>} parent Node to be displayed until the element settle
 * @return {ChildNode}
 */
export function createPortal(asyncElement, parent) {
  const portal = document.createElement(PORTAL_ELEMENT_NAME);

  Promise.resolve(asyncElement).then(element => {
    portal.attach(element, parent);
  });

  return portal;
}
