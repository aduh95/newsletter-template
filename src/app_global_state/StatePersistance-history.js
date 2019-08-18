import { HISTORY_FORWARD, HISTORY_REWIND } from "./commands.js";

const DELAY_FOR_STATE_MERGING = 1500;

class StateHistory {
  #history = [];
  #currentStatePointer = -1;
  #oldestPointer = 0;

  #mergeSuccessiveStates;
  #numberOfNextStates = 0;

  pushNewEntry(state) {
    if (
      "components" in state &&
      this.#history[this.#currentStatePointer] &&
      JSON.stringify(state.components) ===
        JSON.stringify(this.#history[this.#currentStatePointer].components)
    ) {
      return;
    }
    if (this.#mergeSuccessiveStates) {
      clearTimeout(this.#mergeSuccessiveStates);
    } else {
      ++this.#currentStatePointer;
    }
    this.#numberOfNextStates = 0;
    this.#history[this.#currentStatePointer] = state;
    this.#mergeSuccessiveStates = setTimeout(() => {
      this.#mergeSuccessiveStates = null;
    }, DELAY_FOR_STATE_MERGING);
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
      hasPrevious: this.#oldestPointer < this.#currentStatePointer,
      hasNext: this.#numberOfNextStates > 0,
    };
  }
}

export let history = new StateHistory();

export function clear() {
  history = new StateHistory();
}

export const handleCommand = command => {
  return HISTORY_FORWARD === command
    ? history.forwardToNextState()
    : HISTORY_REWIND === command
    ? history.rewindToPreviousState()
    : {};
};

export const getNavigationPossibilities = () =>
  history.getNavigationPossibilities();
