import localForage from "localforage";

import {
  LAST_SAVE_KEY,
  SAVED_TEMPLATE_NAME,
  PERSISTANT_STORAGE_KEY,
} from "./StatePersistance-const.js";
import {
  PERSISTANCE_INITIATE_FROM_DATASET as FROM_DATASET,
  PERSISTANCE_INITIATE_FROM_SCRATCH as FROM_SCRACTH,
  PERSISTANCE_CLEAR_SAVED_STATE,
  PERSISTANCE_GET_LAST_SAVE_DATE,
} from "./commands.js";

import { clear as clearSessionHistory } from "./StatePersistance-history.js";

const cachedState = {};

export async function saveState(replacingState) {
  try {
    await localForage.setItem(
      PERSISTANT_STORAGE_KEY,
      JSON.stringify(Object.assign(cachedState, replacingState))
    );
    await localForage.setItem(LAST_SAVE_KEY, Date.now());
  } catch {
    console.log("localForage is not available");
  }
}

export const handleCommand = ([command, data]) => {
  switch (command) {
    case FROM_DATASET:
      const { css, components, hostname, name } = data;
      localForage
        .setItem(SAVED_TEMPLATE_NAME, name)
        .then(() => saveState({ css, components, hostname }))
        .catch(console.warn);

    case FROM_SCRACTH:
      return Promise.resolve(clearSessionHistory());

    case PERSISTANCE_CLEAR_SAVED_STATE:
      return localForage.clear().catch(console.warn);

    case PERSISTANCE_GET_LAST_SAVE_DATE:
      return localForage.getItem(LAST_SAVE_KEY).catch(() => null);
  }
};
