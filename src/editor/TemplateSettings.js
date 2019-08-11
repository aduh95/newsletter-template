import { h, Component } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const openSettings = () =>
  import("../notify.js")
    .then(module => module.default)
    .then(notify => notify("Not implmented yet"));

export default class Quit extends Component {
  render() {
    return (
      <button onClick={openSettings} title="Edit template settings">
        <FontAwesomeIcon icon={faCog} />
        &nbsp;Settings
      </button>
    );
  }
}
