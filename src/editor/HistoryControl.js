import { h, Component, Fragment } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faHistory, faRedo } from "@fortawesome/free-solid-svg-icons";

import statePersistance from "../StatePersistance.js";

export default class HistoryControl extends Component {
  componentWillMount() {
    statePersistance.subscribe(this.update.bind(this));
    this.update();
  }

  componentWillUnmount() {
    statePersistance.unsubscribe(this.update.bind(this));
  }

  update() {
    const { hasPreviousState, hasNextState } = statePersistance;
    console.log({ hasPreviousState, hasNextState });
    this.setState({ hasPreviousState, hasNextState });
  }

  render() {
    return (
      <>
        <button
          onClick={() => statePersistance.rewindToPreviousState()}
          disabled={!this.state.hasPreviousState}
          title="Cancel last action"
        >
          <FontAwesomeIcon icon={faHistory} />
          &nbsp;Cancel
        </button>
        <button
          onClick={() => this.exportHTMLFile()}
          disabled={!this.state.hasNextState}
          title="Redo last action"
        >
          <FontAwesomeIcon icon={faRedo} />
          &nbsp;Redo
        </button>
      </>
    );
  }
}
