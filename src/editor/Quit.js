import { h } from "preact";
import { PureComponent } from "preact/compat";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import statePersistance from "../app_global_state/History.js";
const closeCurrentSession = statePersistance.clearCurrentSession.bind(
  statePersistance
);

export default class Quit extends PureComponent {
  componentDidMount() {
    this.base.focus();
  }

  render() {
    console.log("render");
    return (
      <button
        onClick={closeCurrentSession}
        title="Close current template"
        accessKey="q"
      >
        <FontAwesomeIcon icon={faTimes} />
        &nbsp;Close
      </button>
    );
  }
}
