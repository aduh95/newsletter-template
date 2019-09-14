import { h, Component, Fragment } from "../utils/jsx.js";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faUndo, faRedo } from "@fortawesome/free-solid-svg-icons";

import statePersistance from "../app_global_state/History.js";

const redo = statePersistance.forwardToNextState.bind(statePersistance);

export default class HistoryControl extends Component {
  #update = this.update.bind(this);

  #undoButton = (
    <button onClick={this.#undo} disabled={true} title="Cancel last action">
      <FontAwesomeIcon icon={faUndo} />
      &nbsp;Undo
    </button>
  );
  #redoButton = (
    <button onClick={redo} disabled={true} title="Redo last action">
      <FontAwesomeIcon icon={faRedo} />
      &nbsp;Redo
    </button>
  );

  #undo = () => {
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
    this.#undoButton.then(btn => {
      btn.disabled = !hasPreviousState;
    });
    this.#redoButton.then(btn => {
      btn.disabled = !hasNextState;
    });
  }

  render() {
    console.log("render");

    this.componentDidMount();

    return (
      <>
        {this.#undoButton}
        {this.#redoButton}
      </>
    );
  }
}
