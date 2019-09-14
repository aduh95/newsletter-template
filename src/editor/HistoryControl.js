import { h, Component, Fragment } from "../utils/jsx.js";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faUndo, faRedo } from "@fortawesome/free-solid-svg-icons";

import statePersistance from "../app_global_state/History.js";

const redo = statePersistance.forwardToNextState.bind(statePersistance);

const createButton = (onClick, title, icon, text) => (
  <button onClick={onClick} disabled={true} title={title}>
    <FontAwesomeIcon icon={icon} />
    &nbsp;{text}
  </button>
);

export default class HistoryControl extends Component {
  #update = this.update.bind(this);

  #undo = () => {
    statePersistance.rewindToPreviousState();
  };

  #undoButton = createButton(this.#undo, "Cancel last action", faUndo, "Undo");
  #redoButton = createButton(redo, "Redo last action", faRedo, "Redo");

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
