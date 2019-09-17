import createPortalVendor from "@aduh95/async-jsx/dist/react/createPortal.js";
import "./createPortal.css";

/**
 * @param {Promise<Node>} asyncElement Async element
 * @param {ParentNode|Promise<ParentNode>} parent Node to be displayed until the element settle
 * @param {Function} callback
 * @return {ChildNode}
 */
export function createPortal() {
  const portal = createPortalVendor(...arguments);
  portal.dataset.contents = true;

  return portal;
}
