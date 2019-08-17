import {
  COMMAND_OF_TYPE_EXPORT,
  COMMAND_OF_TYPE_HISTORY,
  COMMAND_OF_TYPE_SAVE,
  COMMAND_OF_TYPE_PERSISTANCE,
} from "./commands.js";

import * as history from "./StatePersistance-history.js";
import * as exportState from "./StatePersistance-export.js";
import * as save from "./StatePersistance-save.js";
import * as persistance from "./StatePersistance-persistance.js";

onmessage = message => {
  const [command] = message.data;
  if (command & COMMAND_OF_TYPE_HISTORY) {
    const replacingState = history.handleCommand(command);
    postMessage({ ...replacingState, ...history.getNavigationPossibilities() });
    persistance.saveState(replacingState).catch(console.warn);
  } else if (command & COMMAND_OF_TYPE_SAVE) {
    const replacingState = save.handleCommand(message.data);
    postMessage(history.getNavigationPossibilities());
    persistance.saveState(replacingState).catch(console.warn);
  } else if (command & COMMAND_OF_TYPE_EXPORT) {
    const data = exportState.handleCommand(message.data);
    postMessage({ data }, [data]);
  } else if (command & COMMAND_OF_TYPE_PERSISTANCE) {
    persistance.handleCommand(message.data);
  }
};
