import { h, Component, Fragment } from "preact";
import { setGlobalDragOverListener } from "./createDragHandler.js";

import "./DropZone.scss";

if (!("text" in Blob.prototype)) {
  import("./polyfill/blob-text.js");
}

const DRAG_CLASS_NAME = "dragover";
const DROP_ZONE_ID = "drop-zone";

export default class DropZone extends Component {
  state = { previewing: true, content: null };

  componentDidMount() {
    setGlobalDragOverListener(e => {
      e.preventDefault();
      document.documentElement.classList.add(DRAG_CLASS_NAME);
    });
    document.getElementById(DROP_ZONE_ID).addEventListener("drop", e => {
      e.preventDefault();

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

      document.documentElement.classList.remove(DRAG_CLASS_NAME);
    });
    document.getElementById(DROP_ZONE_ID).addEventListener("dragleave", e => {
      e.preventDefault();
      document.documentElement.classList.remove(DRAG_CLASS_NAME);
    });
  }

  render() {
    return <div id={DROP_ZONE_ID} />;
  }
}
