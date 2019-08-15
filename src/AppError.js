import { h } from "preact";

import "./AppError.css";

const historyAction = action =>
  import("./app_global_state/History.js")
    .then(module => module.default)
    .then(action)
    .catch(() =>
      import("./notify.js")
        .then(module => module.default)
        .then(notify => notify("Cannot undo last action"))
        .then(() => Promise.reject(e))
    );

export default function Error(props) {
  const cancelLastAction = e => {
    e.preventDefault();
    historyAction(history => history.rewindToPreviousState()).then(
      () => props.resetState(),
      console.error
    );
  };
  const resetApp = e => {
    e.preventDefault();
    historyAction(history => history.clearCurrentSession()).then(
      () => props.resetState(),
      console.error
    );
  };
  console.log("render");
  return (
    <main data-ignore className="error">
      <h2>Oops!</h2>
      <p>You have encountered an error.</p>
      {statePersistance.hasPreviousState ? (
        <a onClick={cancelLastAction} href="#">
          Cancel last action
        </a>
      ) : null}
      <a onClick={resetApp} href="#">
        Reset the app
      </a>
    </main>
  );
}
