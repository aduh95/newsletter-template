import string2UInt8Array from "./base64DecToArr.js";
import {
  EXPORT_STATE_AS_ARRAY_BUFFER,
  EXPORT_STATE_AS_JS_OBJECT,
} from "./commands.js";

import {
  PERSISTANT_STORAGE_KEY,
  LAST_SAVE_KEY,
} from "./StatePersistance-const.js";

export const handleCommand = ([command]) => {
  switch (command) {
    case EXPORT_STATE_AS_ARRAY_BUFFER:
      return string2UInt8Array(localStorage.getItem(CONTENT_KEY)).buffer;

    case EXPORT_STATE_AS_JS_OBJECT:
      return JSON.parse(localStorage.getItem(CONTENT_KEY));
  }
};
