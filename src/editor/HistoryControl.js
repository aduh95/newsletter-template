import { h, Component, Fragment } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faUndo, faRedo } from "@fortawesome/free-solid-svg-icons";

import statePersistance from "../StatePersistance.js";

const undo = statePersistance.rewindToPreviousState.bind(statePersistance);
const redo = statePersistance.forwardToNextState.bind(statePersistance);

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
    if (
      hasPreviousState !== this.state.hasPreviousState ||
      hasNextState !== this.state.hasNextState
    ) {
      this.setState({ hasPreviousState, hasNextState });
    }
  }

  render() {
    console.log("render");
    return (
      <>
        <button
          onClick={undo}
          disabled={!this.state.hasPreviousState}
          title="Cancel last action"
        >
          <FontAwesomeIcon icon={faUndo} />
          &nbsp;Undo
        </button>
        <button
          onClick={redo}
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
