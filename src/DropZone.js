import { h, Component, Fragment } from "preact";
import { setGlobalDragOverListener } from "./createDragHandler.js";

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

export default class DropZone extends Component {
  state = { previewing: true, content: null };
  componentDidMount() {
    setGlobalDragOverListener(dragStart);

    document
      .getElementById(DROP_ZONE_ID)
      .addEventListener("dragleave", dragEnd);
    document.getElementById(DROP_ZONE_ID).addEventListener("click", dragEnd);
    document.getElementById(DROP_ZONE_ID).addEventListener("drop", e => {
      dragEnd(e);

      const { dataHandler } = this.props;

      for (const file of e.dataTransfer.items || e.dataTransfer.files) {
        if (file.kind === "file") {
          file
            .getAsFile()
            .text()
            .then(JSON.parse)
            .then(dataHandler);
        } else if (file.kind === "string") {
          console.warn("File was expected, received string", file);
        } else {
          file
            .text()
            .then(JSON.parse)
            .then(dataHandler);
        }
      }
    });
  }

  render() {
    return <div id={DROP_ZONE_ID} />;
  }
}
