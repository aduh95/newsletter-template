import { HISTORY_FORWARD, HISTORY_REWIND } from "./commands.js";
import {
  OPERATION_ADD,
  OPERATION_SET,
  OPERATION_MOVE,
} from "./state-apply-revert-operations.js";

const DELAY_FOR_STATE_MERGING = 1500;

class StateHistory {
  #history = [];
  #currentStatePointer = -1;
  #oldestPointer = 0;

  #mergeSuccessiveStates;
  #numberOfNextStates = 0;

  #isDuplicateStateEntry(previousHistoryEntry) {
    return (
      -1 === previousHistoryEntry.findIndex(entry => entry.revert !== null)
    );
  }

  #mergeOperations(historyEntry, operation) {
    const { target, type } = operation;
    const ADDITIVE_OPERATION = OPERATION_ADD | OPERATION_SET;
    if (type & ADDITIVE_OPERATION) {
      const addOperation = historyEntry.find(
        ({ apply: { target: entryTarget, type } }) =>
          target === entryTarget && type & ADDITIVE_OPERATION
      );
      if (addOperation) {
        if (
          addOperation.revert.type === OPERATION_SET &&
          addOperation.revert.value === operation.value
        ) {
          Object.assign(addOperation, { apply: null, revert: null });
        } else {
          addOperation.apply.value = operation.value;
        }
        return;
      }
    } else if (type & OPERATION_MOVE) {
      const moveOperation = historyEntry.find(
        ({ apply: { target: entryTarget, type } }) =>
          target === entryTarget && type === OPERATION_MOVE
      );
      if (moveOperation) {
        if (moveOperation.revert.position === operation.position) {
          Object.assign(moveOperation, { apply: null, revert: null });
        } else {
          moveOperation.apply.position = operation.position;
        }
        return;
      }
    }
    historyEntry.push(getHistoryEntryFromOperation(operation));
  }

  pushNewEntry(operation) {
    if (this.#mergeSuccessiveStates) {
      clearTimeout(this.#mergeSuccessiveStates);
      this.#mergeOperations(
        this.#history[this.#currentStatePointer],
        operation
      );
    } else {
      this.#history[++this.#currentStatePointer] = [
        getHistoryEntryFromOperation(operation),
      ];
    }
    this.#numberOfNextStates = 0;
    this.#mergeSuccessiveStates = setTimeout(() => {
      this.#mergeSuccessiveStates = null;
    }, DELAY_FOR_STATE_MERGING);
  }

  rewindToPreviousState() {
    this.#numberOfNextStates++;
    while (
      this.#isDuplicateStateEntry(this.#history[--this.#currentStatePointer])
    ) {
      this.#history.splice(this.#currentStatePointer, 1);
    }
    return this.#history[this.#currentStatePointer];
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
