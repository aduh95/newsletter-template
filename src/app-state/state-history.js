import { HISTORY_FORWARD, HISTORY_REWIND } from "./commands.js";

import { cachedState } from "./StatePersistance-persistance.js";

const DELAY_FOR_STATE_MERGING = 1500;

class StateHistory {
  #history = [];
  #currentStatePointer = -1;
  #oldestPointer = 0;

  #mergeSuccessiveStates;
  #numberOfNextStates = 0;

  #isDuplicateStateEntry(nextState) {
    const nextStateKeys = Object.keys(nextState);

    return (
      nextStateKeys.reduce((pv, key) => pv && key in cachedState, true) &&
      nextStateKeys.reduce(
        (pv, key) =>
          pv &&
          JSON.stringify(nextState[key]) === JSON.stringify(cachedState[key]),
        true
      )
    );
  }

  pushNewEntry(state) {
    if (
      this.#currentStatePointer in this.#history &&
      this.#isDuplicateStateEntry(state)
    ) {
      return;
    }
    if (this.#mergeSuccessiveStates) {
      clearTimeout(this.#mergeSuccessiveStates);
      Object.assign(this.#history[this.#currentStatePointer], state);
    } else {
      this.#history[++this.#currentStatePointer] = state;
    }
    this.#numberOfNextStates = 0;
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
