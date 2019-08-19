/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#Solution_5_%E2%80%93_rewrite_the_DOMs_atob()_and_btoa()_using_JavaScript's_TypedArrays_and_UTF-8
 */

/**
 * @param {JSONSerializable} obj
 */
export default function exportJSONObjectToArrayBuffer(obj) {
  const jsonRepresentation = JSON.stringify(obj);

  const { buffer } = new TextEncoder().encode(jsonRepresentation);

  return buffer;
}
