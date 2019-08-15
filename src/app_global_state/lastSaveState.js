import {
  SAVED_TEMPLATE_NAME,
  PERSISTANT_STORAGE_KEY,
  LAST_SAVE_KEY,
} from "./StatePersistance-const.js";

export function lastSaveDate() {
  const previousTimestamp = localStorage.getItem(LAST_SAVE_KEY);
  return previousTimestamp && new Date(Number(previousTimestamp));
}

export function clear() {
  localStorage.removeItem(SAVED_TEMPLATE_NAME);
  localStorage.removeItem(PERSISTANT_STORAGE_KEY);
  localStorage.removeItem(LAST_SAVE_KEY);
}

export function recover() {
  return import("./initiateState.js")
    .then(module => module.default)
    .then(initiateState =>
      initiateState.initiateWith({
        name: localStorage.getItem(SAVED_TEMPLATE_NAME),
        ...JSON.parse(localStorage.getItem(PERSISTANT_STORAGE_KEY)),
      })
    );
}
