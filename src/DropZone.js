import { h, Component, Fragment } from "preact";
import {
  setGlobalDragOverListener,
  removeGlobalDragOverListener,
} from "./createDragHandler.js";

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
const drop = function(e) {
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
};

export default class DropZone extends Component {
  state = { previewing: true, content: null };

  #dropHandler = drop.bind(this);

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
        onDrop={this.#dropHandler}
      />
    );
  }
}
