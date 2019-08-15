import {
  LAST_SAVE_KEY,
  SAVED_TEMPLATE_NAME,
  PERSISTANT_STORAGE_KEY,
} from "./StatePersistance-const.js";
import {
  PERSISTANCE_INITIATE_FROM_DATASET as FROM_DATASET,
  PERSISTANCE_INITIATE_FROM_SCRATCH as FROM_SCRACTH,
  PERSISTANCE_CLEAR_SAVED_STATE,
} from "./commands.js";

import { clear as clearSessionHistory } from "./StatePersistance-history.js";

const cachedState = {};

export function saveState(replacingState) {
  try {
    localStorage.setItem(
      PERSISTANT_STORAGE_KEY,
      JSON.stringify(Object.assign(cachedState, replacingState))
    );
    localStorage.setItem(LAST_SAVE_KEY, Date.now());
  } catch {
    console.log("localStorage is not available");
  }
}

export const handleCommand = ([command, data]) => {
  switch (command) {
    case FROM_DATASET:
      const { css, components, hostname, name } = data;
      localStorage.setItem(SAVED_TEMPLATE_NAME, name);
      saveState({ css, components, hostname });

    case FROM_SCRACTH:
      return clearSessionHistory();

    case PERSISTANCE_CLEAR_SAVED_STATE:
      localStorage.clear();
  }
};
