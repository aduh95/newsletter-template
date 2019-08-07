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
    : Promise.all([
        import("dialog-polyfill"),
        import("dialog-polyfill/dist/dialog-polyfill.css"),
      ]).then(module => module[0].default.registerDialog(dialog));
