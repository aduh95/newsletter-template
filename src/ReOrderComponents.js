import { h, Component, Fragment } from "preact";

import "./ReOrderComponents.css";

const DRAG_CLASS_NAME = "dragover";
const DROP_ZONE_ID = "re-order-elements";
const CHECK_CHILDREN_ELEMENT = "re-order-elements-check-children";
const RE_ORDERING_CLASS_NAME = "re-order-elements-reordering";

const observees = [];

const clickHandler = e => {
  e.preventDefault();
  const { target } = e;
  target.id = CHECK_CHILDREN_ELEMENT;
  const subElements = target.querySelectorAll(
    `#${CHECK_CHILDREN_ELEMENT}>[data-name]`
  );
  console.log(target, subElements);

  if (subElements.length) {
    try {
      document.getElementById(RE_ORDERING_CLASS_NAME).removeAttribute("id");
    } catch {}

    target.setAttribute("id", RE_ORDERING_CLASS_NAME);
    target.prepend(document.getElementById(DROP_ZONE_ID));

    flushEventListeners();
    Array.from(subElements).forEach(addEventListener);

    target.scrollIntoViewIfNeeded();
  } else {
    target.removeAttribute("id");
  }
};

const dragHandler = e => {
  // TODO
  new IntersectionObserver(console.log);
};

const addEventListener = el => {
  observees.push(el);
  el.addEventListener("click", clickHandler);
  el.addEventListener("drag", dragHandler);
  el.draggable = true;
};

const flushEventListeners = () => {
  observees.forEach(el => {
    el.removeEventListener("click", clickHandler);
    el.removeEventListener("drag", dragHandler);
    el.draggable = false;
  });
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
