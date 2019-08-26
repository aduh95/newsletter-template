import {
  SAVE_NAME,
  SAVE_HOSTNAME,
  SAVE_CSS,
  SAVE_COMPONENTS,
} from "./commands.js";

import { mutateState } from "./component-operations.js";
import { history } from "./StatePersistance-history.js";

const cachedComponents = {};

const historyKeys = {
  [SAVE_NAME]: "name",
  [SAVE_HOSTNAME]: "hostname",
  [SAVE_CSS]: "css",
  [SAVE_COMPONENTS]: "components",
};

export const handleCommand = ([command, data]) => {
  if (data === null) {
    return {};
  }
  const newHistoryEntry = { [historyKeys[command]]: data };
  if (command === SAVE_COMPONENTS) {
    const revert = mutateState(cachedComponents, data);

    newHistoryEntry[SAVE_COMPONENTS] = cachedComponents;
    history.pushNewEntry(newHistoryEntry, {
      [SAVE_COMPONENTS]: {
        apply: data,
        revert,
      },
    });
  } else {
    history.pushNewEntry(newHistoryEntry);
  }
  return newHistoryEntry;
};
