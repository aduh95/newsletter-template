import {
  COMMAND_OF_TYPE_EXPORT,
  COMMAND_OF_TYPE_HISTORY,
  COMMAND_OF_TYPE_SAVE,
} from "./commands.js";

import * as history from "./StatePersistance-history.js";
import * as exportState from "./StatePersistance-export.js";
import * as save from "./StatePersistance-save.js";

import {
  PERSISTANT_STORAGE_KEY,
  LAST_SAVE_KEY,
} from "./StatePersistance-const.js";

const cachedState = {};

function setPersistantState(replacingState) {
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

onmessage = message => {
  const [command] = message.data;
  if (command & COMMAND_OF_TYPE_HISTORY) {
    const replacingState = history.handleCommand(command);
    postMessage({ ...replacingState, ...history.getNavigationPossibilities() });
    setPersistantState(replacingState);
  } else if (command & COMMAND_OF_TYPE_SAVE) {
    const replacingState = save.handleCommand(message.data);
    postMessage(history.getNavigationPossibilities());
    setPersistantState(replacingState);
  } else if (command & COMMAND_OF_TYPE_EXPORT) {
    const data = exportState.handleCommand(message.data);
    postMessage({ data }, [data]);
  }
};
