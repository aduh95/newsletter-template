import { h, Component } from "../utils/jsx.js";

import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import statePersistance from "../app_global_state/History.js";
const closeCurrentSession = statePersistance.clearCurrentSession.bind(
  statePersistance
);

export default class Quit extends Component {
  render() {
    console.log("render");
    return (
      <button onClick={closeCurrentSession} title="Close current template">
        <FontAwesomeIcon icon={faTimes} />
        &nbsp;Close
      </button>
    );
  }
}
