import { h } from "./utils/jsx.js";

import "./AppError.css";

const historyAction = (action, errorMessage) =>
  import("./app_global_state/History.js")
    .then(module => module.default)
    .then(action)
    .catch(() =>
      import("./notify.js")
        .then(module => module.default)
        .then(notify => notify(errorMessage))
        .then(() => Promise.reject(e))
    );

export default function Error(props) {
  const cancelLastAction = e => {
    e.preventDefault();
    historyAction(
      history => history.rewindToPreviousState(),
      "Cannot undo last action"
    ).then(() => props.resetState(), console.error);
  };
  const resetApp = e => {
    e.preventDefault();
    historyAction(
      history => history.clearCurrentSession(),
      "Cannot reset current session"
    ).then(() => props.resetState(), console.error);
  };
  console.log("render");
  return (
    <main data-ignore className="error">
      <h2>Oops!</h2>
      <p>You have encountered an error.</p>
      <a onClick={cancelLastAction} href="#">
        Cancel last action
      </a>
      <a onClick={resetApp} href="#">
        Reset the app
      </a>
    </main>
  );
}
