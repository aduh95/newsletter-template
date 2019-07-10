import { h, Component, Fragment } from "preact";

import "./ReOrderComponents.css";

const DRAG_CLASS_NAME = "dragover";
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
    `#${CHECK_CHILDREN_ELEMENT}>[data-name]`
  );
  console.log("click", e);
  console.log(target, subElements);

  if (subElements.length) {
    try {
      // TODO replace with ES next ?. syntax
      document.getElementById(RE_ORDERING_CLASS_NAME).removeAttribute("id");
    } catch {}

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

/**
 * @param {DragEvent} e
 */
const dragStartHandler = e => {
  // TODO
  const { target } = e;
  const { parentElement } = target;
  let destination;

  /**
   * @param {DragEvent} e
   */
  const dragOverHandler = e => {
    e.stopImmediatePropagation();
    destination = e.toElement;
  };
  const dragLeaveHandler = () => {
    destination = null;
  };

  parentElement.addEventListener("dragover", dragOverHandler, {
    passive: true,
  });
  document.body.addEventListener("dragover", dragLeaveHandler, {
    passive: true,
  });
  target.addEventListener(
    "dragend",
    () => {
      if (destination) {
        parentElement.insertBefore(target, destination);
      } else {
        target.remove();
      }
      parentElement.removeEventListener("dragover", dragOverHandler);
      document.body.removeEventListener("dragover", dragLeaveHandler);
    },
    {
      once: true,
      passive: true,
    }
  );
};

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
      document.querySelectorAll(`#${DROP_ZONE_ID}~[data-name]`)
    ).forEach(addEventListener);
  }

  render() {
    return <div id={DROP_ZONE_ID} />;
  }
}
