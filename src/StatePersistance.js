const OLDEST_STATE_INDEX = "oldest";
const CURRENT_STATE_ID = "current";
const HISTORY_ENTRY_PREFIX = "state";

const CONTENT_KEY = "content";
const LAST_SAVE_KEY = "lastSaveDate";

export default new (class StatePersistance {
  #nbOfNextStates = 0;
  #observers = new Set();

  subscribe(obj) {
    this.#observers.add(obj);
  }

  unsubscribe(obj) {
    this.#observers.delete(obj);
  }

  rewindToPreviousState() {
    const id = Number(sessionStorage.getItem(CURRENT_STATE_ID)) - 1;
    const state = sessionStorage.getItem(HISTORY_ENTRY_PREFIX + id);
    this.#nbOfNextStates++;
    return this.#popStateFromHistory(state);
  }

  forwardToNextState() {
    const id = Number(sessionStorage.getItem(CURRENT_STATE_ID)) + 1;
    const state = sessionStorage.getItem(HISTORY_ENTRY_PREFIX + id);
    this.#nbOfNextStates--;
    return this.#popStateFromHistory(state);
  }

  #popStateFromHistory(state) {
    const parsedState = {};
    try {
      Object.assign(parsedState, JSON.parse(state));
      this.#setPersistantState(state);
    } catch {
    } finally {
      this.#observers.forEach(o => o(parsedState));
    }

    return parsedState;
  }

  #pushNewHistoryEntry(data) {
    const currentStateID = sessionStorage.getItem(CURRENT_STATE_ID);
    const id = currentStateID === null ? 0 : Number(currentStateID) + 1;

    if (currentStateID === null) {
      sessionStorage.setItem(OLDEST_STATE_INDEX, 0);
      sessionStorage.setItem(CURRENT_STATE_ID, 0);
    }
    this.#nbOfNextStates = 0;

    try {
      sessionStorage.setItem(HISTORY_ENTRY_PREFIX + id, data);
    } catch {
      // we need to clear up some space by removing oldest states
      const oldestStateIndex = Number(
        sessionStorage.getItem(OLDEST_STATE_INDEX)
      );
      sessionStorage.removeItem(HISTORY_ENTRY_PREFIX + oldestStateIndex);
      sessionStorage.setItem(OLDEST_STATE_INDEX, oldestStateIndex + 1);
      sessionStorage.setItem(HISTORY_ENTRY_PREFIX + id, data);
    }
  }

  get hasPreviousState() {
    return (
      Number(sessionStorage.getItem(OLDEST_STATE_INDEX)) <
      Number(sessionStorage.getItem(CURRENT_STATE_ID))
    );
  }
  get hasNextState() {
    return this.#nbOfNextStates > 0;
  }

  set currentState(data) {
    try {
      const stringData = JSON.stringify(data);
      this.#setPersistantState(stringData);
      this.#pushNewHistoryEntry(stringData);
    } catch {
    } finally {
      this.#observers.forEach(o => o(data));
    }
  }

  get currentState() {
    return JSON.parse(
      sessionStorage.getItem(
        HISTORY_ENTRY_PREFIX + sessionStorage.getItem(CURRENT_STATE_ID)
      )
    );
  }

  #setPersistantState(data) {
    localStorage.setItem(CONTENT_KEY, data);
    localStorage.setItem(LAST_SAVE_KEY, Date.now());
  }

  get hasRecoverableState() {
    return localStorage.getItem(CONTENT_KEY) !== null;
  }

  get lastSavedStateDate() {
    return this.hasRecoverableState
      ? new Date(Number(localStorage.getItem(LAST_SAVE_KEY)))
      : null;
  }

  recoverSaveState() {
    const state = localStorage.getItem(CONTENT_KEY);
    try {
      sessionStorage.setItem(OLDEST_STATE_INDEX, 0);
      sessionStorage.setItem(CURRENT_STATE_ID, 0);
      sessionStorage.setItem(HISTORY_ENTRY_PREFIX + "0", state);
    } catch {
    } finally {
      this.#observers.forEach(o => o(JSON.parse(state)));
    }
  }

  clearCurrentSession() {
    sessionStorage.clear();
    this.#observers.forEach(o => o({}));
  }

  clearRecoverState() {
    localStorage.removeItem(CONTENT_KEY);
  }
})();
