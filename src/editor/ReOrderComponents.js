import { h, Component, Fragment } from "preact";

import "./ReOrderComponents.scss";
import createDragHandler from "../createDragHandler.js";

const DROP_ZONE_ID = "re-order-elements";
const CHECK_CHILDREN_ELEMENT = "re-order-elements-check-children";
const RE_ORDERING_CLASS_NAME = "re-order-elements-reordering";

/**
 * @type {HTMLElement[]}
 */
const observees = [];

const clickHandler = e => {
  e.preventDefault();
  const { target } = e;
  target.id = CHECK_CHILDREN_ELEMENT;
  const subElements = target.querySelectorAll(
    `#${CHECK_CHILDREN_ELEMENT}>[data-type]`
  );

  if (subElements.length) {
    document.getElementById(RE_ORDERING_CLASS_NAME)?.removeAttribute("id");

    target.setAttribute("id", RE_ORDERING_CLASS_NAME);
    target.prepend(document.getElementById(DROP_ZONE_ID));

    flushEventListeners();
    Array.from(subElements).forEach(addEventListener);

    if (subElements.length === 1) {
      // If there's just 1 Element, try to travers as there's nothing to reorder
      subElements[0].click();
    } else {
      target.scrollIntoViewIfNeeded();
    }
  } else {
    target.removeAttribute("id");
  }
};

const dragStartHandler = createDragHandler(({ target }, destination) => {
  if (destination) {
    target.parentElement.insertBefore(target, destination);
  } else {
    target.remove();
  }
});

/**
 * @param {HTMLElement} el
 */
const addEventListener = el => {
  observees.push(el);
  el.addEventListener("click", clickHandler);
  el.addEventListener("dragstart", dragStartHandler);
  el.draggable = true;
};

const flushEventListeners = () => {
  observees.forEach(el => {
    el.removeEventListener("click", clickHandler);
    el.removeEventListener("dragstart", dragStartHandler);
    el.draggable = false;
  });
  observees.splice(0);
};

export default class ReOrderComponents extends Component {
  state = { previewing: true, content: null };

  componentDidMount() {
    Array.from(
      document.querySelectorAll(`#${DROP_ZONE_ID}~[data-type]`)
    ).forEach(addEventListener);
  }

  render() {
    return <div id={DROP_ZONE_ID} />;
  }
}
