import { h, Component, Fragment } from "../utils/jsx.js"

import "./ReOrderComponents.scss";
import createDragHandler from "../createDragHandler.js";

const DROP_ZONE_ID = "re-order-elements";
const CURRENTLY_RE_ORDERING_CLASS_NAME = "re-order-elements-reordering";

/**
 * @type {HTMLElement[]}
 */
const observees = [];

const clickHandler = e => {
  e.preventDefault();
  const { target } = e;
  const subElements = Array.from(target.children).filter(el =>
    el.hasAttribute("data-type")
  );

  if (subElements.length) {
    Array.from(
      document.getElementsByClassName(CURRENTLY_RE_ORDERING_CLASS_NAME)
    ).forEach(el => el.classList.remove(CURRENTLY_RE_ORDERING_CLASS_NAME));

    target.classList.add(CURRENTLY_RE_ORDERING_CLASS_NAME);
    target.prepend(document.getElementById(DROP_ZONE_ID));

    flushEventListeners();
    Array.from(subElements).forEach(addEventListener);

    if (subElements.length === 1) {
      // If there's just 1 Element, try to travers as there's nothing to reorder
      subElements[0].click();
    }
    target.scrollIntoViewIfNeeded({ behavior: "smooth", block: "center" });
  } else {
    import("../notify.js")
      .then(module => module.default)
      .then(notify => notify("No content to reorder"));
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
  componentDidMount() {
    Array.from(
      document.querySelectorAll(`#${DROP_ZONE_ID}~[data-type]`)
    ).forEach(addEventListener);
  }

  componentWillUnmount() {
    flushEventListeners();
    Array.from(
      document.getElementsByClassName(CURRENTLY_RE_ORDERING_CLASS_NAME)
    ).forEach(el => el.classList.remove(CURRENTLY_RE_ORDERING_CLASS_NAME));
    document.getElementById(DROP_ZONE_ID).remove();
  }

  render() {
    console.log("render");
    return <div data-ignore data-do-not-export id={DROP_ZONE_ID} />;
  }
}
