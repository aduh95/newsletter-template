import { h, Component, Fragment } from "preact";

const DRAG_CLASS_NAME = "dragover";
const DROP_ZONE_ID = "drop-zone";

export default class DropZone extends Component {
  state = { previewing: true, content: null };

  componentDidMount() {
    document.body.addEventListener("dragover", e => {
      e.preventDefault();
      document.documentElement.classList.add(DRAG_CLASS_NAME);
    });
    document.getElementById(DROP_ZONE_ID).addEventListener("drop", e => {
      e.preventDefault();

      const promises = [];

      for (let file of e.dataTransfer.items || e.dataTransfer.files) {
        if (file.kind === "file") {
          file = file.getAsFile();
        }
        console.log(file);

        promises.push(this.props.fileHandler(file));
      }
      Promise.all(promises)
        .catch(console.error)
        .finally(() =>
          document.documentElement.classList.remove(DRAG_CLASS_NAME)
        );
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
