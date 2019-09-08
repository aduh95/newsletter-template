import object2ArrayBuffer from "./exportJSONObjectToArrayBuffer.js";
import {
  EXPORT_STATE_AS_ARRAY_BUFFER,
  EXPORT_STATE_AS_JS_OBJECT,
} from "./commands.js";

import { cachedState } from "./StatePersistance-persistance.js";

export const handleCommand = ([command]) => {
  switch (command) {
    case EXPORT_STATE_AS_ARRAY_BUFFER:
      return object2ArrayBuffer(cachedState);

    case EXPORT_STATE_AS_JS_OBJECT:
      return JSON.stringify(cachedState);
  }
};
