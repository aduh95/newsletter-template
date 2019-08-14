import { HISTORY_FORWARD, HISTORY_REWIND } from "./commands.js";

const OLDEST_STATE_INDEX = "oldest";
const CURRENT_STATE_ID = "current";
const HISTORY_ENTRY_PREFIX = "state";

let nbOfNextStates = 0;

export function pushNewEntry(data) {
  const currentStateID = sessionStorage.getItem(CURRENT_STATE_ID);
  const id = currentStateID === null ? 0 : Number(currentStateID) + 1;

  if (currentStateID === null) {
    sessionStorage.setItem(OLDEST_STATE_INDEX, 0);
    sessionStorage.setItem(CURRENT_STATE_ID, 0);
  }
  nbOfNextStates = 0;

  try {
    sessionStorage.setItem(HISTORY_ENTRY_PREFIX + id, data);
  } catch {
    // we need to clear up some space by removing oldest states
    const oldestStateIndex = Number(sessionStorage.getItem(OLDEST_STATE_INDEX));
    sessionStorage.removeItem(HISTORY_ENTRY_PREFIX + oldestStateIndex);
    sessionStorage.setItem(OLDEST_STATE_INDEX, oldestStateIndex + 1);
    sessionStorage.setItem(HISTORY_ENTRY_PREFIX + id, data);
  }
  sessionStorage.setItem(CURRENT_STATE_ID, id);
}

function popState(id) {
  const parsedState = {};
  try {
    const state = sessionStorage.getItem(HISTORY_ENTRY_PREFIX + id);
    Object.assign(parsedState, JSON.parse(state));
    sessionStorage.setItem(CURRENT_STATE_ID, id);
  } catch {
    console.log("State storing is not available");
  }

  return parsedState;
}

function rewindToPreviousState() {
  const id = Number(sessionStorage.getItem(CURRENT_STATE_ID)) - 1;
  nbOfNextStates++;
  return popState(id);
}

function forwardToNextState() {
  const id = Number(sessionStorage.getItem(CURRENT_STATE_ID)) + 1;
  nbOfNextStates--;
  return popState(id);
}

function getCurrentStateAsString() {
  return sessionStorage.getItem(
    HISTORY_ENTRY_PREFIX + sessionStorage.getItem(CURRENT_STATE_ID)
  );
}

export const handleCommand = command => {
  if (HISTORY_FORWARD === command) {
    forwardToNextState();
  } else if (HISTORY_REWIND === command) {
    rewindToPreviousState();
  }
  return JSON.parse(getCurrentStateAsString());
};

export const getNavigationPossibilities = () => ({
  hasPreviousState:
    Number(sessionStorage.getItem(OLDEST_STATE_INDEX)) <
    Number(sessionStorage.getItem(CURRENT_STATE_ID)),
  hasNextState: nbOfNextStates > 0,
});
