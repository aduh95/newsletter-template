import { HISTORY_FORWARD, HISTORY_REWIND } from "./commands.js";

class StateHistory {
  #history = [];
  #currentStatePointer = 0;
  #oldestPointer = 0;

  #numberOfNextStates = 0;

  pushNewEntry(state) {
    this.#numberOfNextStates = 0;
    this.#history[++this.#currentStatePointer] = state;
  }

  rewindToPreviousState() {
    this.#numberOfNextStates++;
    return this.#history[--this.#currentStatePointer];
  }

  forwardToNextState() {
    this.#numberOfNextStates--;
    return this.#history[++this.#currentStatePointer];
  }

  getNavigationPossibilities() {
    return {
      hasPreviousState: this.#oldestPointer < this.#currentStatePointer,
      hasNextState: this.#numberOfNextStates > 0,
    };
  }
}

export let history = new StateHistory();

export function clear() {
  history = new StateHistory();
}

export const handleCommand = command => {
  if (HISTORY_FORWARD === command) {
    history.forwardToNextState();
  } else if (HISTORY_REWIND === command) {
    history.rewindToPreviousState();
  }
  return JSON.parse(getCurrentStateAsString());
};

export const getNavigationPossibilities = history.getNavigationPossibilities.bind(
  history
);
