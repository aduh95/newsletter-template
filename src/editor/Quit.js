import { h, Component, Fragment } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import statePersistance from "../StatePersistance.js";
const closeCurrentSession = statePersistance.clearCurrentSession.bind(
  statePersistance
);

export default class Quit extends Component {
  render() {
    return (
      <button onClick={closeCurrentSession} title="Close current template">
        <FontAwesomeIcon icon={faTimes} />
        &nbsp;Close
      </button>
    );
  }
}
