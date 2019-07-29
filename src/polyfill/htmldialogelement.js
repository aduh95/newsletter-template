const doNotNeedPolyfill = "HTMLDialogElement" in window;

/**
 * Register a dialog element if necessary
 * (that is, if browser doesn't support <dialog> natively)
 * @param {HTMLDialogElement} dialog
 * @returns {Promise<>}
 */
export default dialog =>
  doNotNeedPolyfill
    ? Promise.resolve()
    : import("dialog-polyfill").then(module =>
        module.default.registerDialog(dialog)
      );
