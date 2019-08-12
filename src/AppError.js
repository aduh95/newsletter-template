import { h } from "preact";
import statePersistance from "./StatePersistance.js";

import "./AppError.css";

export default function Error(props) {
  const cancelLastAction = e => {
    e.preventDefault();
    statePersistance.rewindToPreviousState();
    props.resetState();
  };
  const resetApp = e => {
    e.preventDefault();
    statePersistance.clearCurrentSession();
    props.resetState();
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
