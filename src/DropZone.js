import { h, Component, Fragment } from "preact";
import {
  setGlobalDragOverListener,
  removeGlobalDragOverListener,
} from "./createDragHandler.js";

import templateName from "./templateName.js";
import templateHostName from "./templateHostName.js";
import templateComponents from "./templateComponents.js";
import templateCustomCSS from "./TemplateCustomCSS.js";

import "./DropZone.scss";

const DRAG_CLASS_NAME = "dragover";
const DROP_ZONE_ID = "drop-zone";

const dragStart = e => {
  e.preventDefault();
  document.documentElement.classList.add(DRAG_CLASS_NAME);
};
const dragEnd = e => {
  e.preventDefault();
  document.documentElement.classList.remove(DRAG_CLASS_NAME);
};

/**
 * @param {DragEvent} e
 */
const drop = function(e) {
  dragEnd(e);

  for (const item of e.dataTransfer.items || e.dataTransfer.files) {
    if (item.kind === "string") {
      console.warn("File was expected, received string", item);
    } else {
      /**
       * @type {File} file
       */
      const file = item.kind === "file" ? item.getAsFile() : item;
      file
        .text()
        .then(JSON.parse)
        .then(({ hostname, css, components }) => {
          templateName.set(file.name);
          templateHostName.set(hostname);
          templateCustomCSS.set(css);
          templateComponents.set(components);
        })
        .catch(e =>
          import("./notify.js")
            .then(module => module.default)
            .then(notify => notify("Cannot import this file", console.error(e)))
        );
    }
  }
};

export default class DropZone extends Component {
  state = { previewing: true, content: null };

  componentDidMount() {
    setGlobalDragOverListener(dragStart);
  }
  componentWillUnmount() {
    removeGlobalDragOverListener(dragStart);
  }

  render() {
    console.log("render");
    return (
      <div
        id={DROP_ZONE_ID}
        onDragLeave={dragEnd}
        onClick={dragEnd}
        onDrop={drop}
      />
    );
  }
}
