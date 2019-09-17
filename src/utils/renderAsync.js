import {
  renderAsync as renderAsyncVendor,
  conditionalRendering as conditionalRenderingVendor,
} from "@aduh95/async-jsx/dist/renderAsync/index.js";
import "./renderAsync.css";

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
export function renderAsync() {
  const wrapper = renderAsyncVendor(...arguments);
  wrapper.dataset.contents = true;

  return wrapper;
}

export function conditionalRendering() {
  const wrapper = conditionalRenderingVendor(...arguments);
  wrapper.dataset.contents = true;

  return wrapper;
}
