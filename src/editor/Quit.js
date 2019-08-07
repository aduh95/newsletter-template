import { h, Component, Fragment } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import statePersistance from "../StatePersistance.js";

export default class Quit extends Component {
  render() {
    return (
      <button
        onClick={() => statePersistance.clearCurrentSession()}
        title="Close current template"
      >
        <FontAwesomeIcon icon={faTimes} />
        &nbsp;Close
      </button>
    );
  }
}
