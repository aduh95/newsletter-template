import { LAST_SAVE_KEY } from "./StatePersistance-const.js";

export function lastSaveDate() {
  const previousTimestamp = localStorage.getItem(LAST_SAVE_KEY);
  return previousTimestamp && new Date(Number(previousTimestamp));
}

export function clear() {
  return import("../notify.js")
    .then(module => module.default)
    .then(notify => notify("Not implemented yet"));
}

export function recover() {
  return import("../notify.js")
    .then(module => module.default)
    .then(notify => notify("Not implemented yet"));
}
