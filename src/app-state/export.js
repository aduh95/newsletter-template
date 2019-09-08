import {
  EXPORT_STATE_AS_ARRAY_BUFFER,
  EXPORT_STATE_AS_JS_OBJECT,
} from "./commands.js";
import { getCurentState } from "./state-owner.js";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_5_%E2%80%93_rewrite_the_DOMs_atob()_and_btoa()_using_JavaScript%27s_TypedArrays_and_UTF-8
 * @param {JSONSerializable} obj
 */
function object2ArrayBuffer(obj) {
  const jsonRepresentation = JSON.stringify(obj);

  const { buffer } = new TextEncoder().encode(jsonRepresentation);

  return buffer;
}

export const handleCommand = ([command]) => {
  switch (command) {
    case EXPORT_STATE_AS_ARRAY_BUFFER:
      return object2ArrayBuffer(getCurentState());

    case EXPORT_STATE_AS_JS_OBJECT:
      return JSON.stringify(getCurentState());
  }
};
