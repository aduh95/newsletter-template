import { h, Component, Fragment } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faUndo, faRedo } from "@fortawesome/free-solid-svg-icons";

import statePersistance from "../app_global_state/History.js";

const redo = statePersistance.forwardToNextState.bind(statePersistance);

export default class HistoryControl extends Component {
  #update = this.update.bind(this);

  #undo = () => {
    if (!this.state.hasNextState) {
      this.props.editor.forceToReRender();
    }
    statePersistance.rewindToPreviousState();
  };

  componentDidMount() {
    statePersistance.subscribe(this.#update);
    this.update(statePersistance.get());
  }

  componentWillUnmount() {
    statePersistance.unsubscribe(this.#update);
  }

  update({ hasPreviousState, hasNextState }) {
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
          onClick={this.#undo}
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
