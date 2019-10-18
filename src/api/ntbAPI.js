import getExportableElements, {
  getExportableHTML,
} from "./getExportableElements.js";
import templateComponents from "../app_global_state/templateComponents.js";

export default async function ntbAPI(file) {
  await initiateState.initiateWithFile(file);
  await new Promise(d => requestIdleCallback(d));

  return getExportableElements();
}

import("./getLastSavedDate.js")
  .then(module => module.default)
  .then(getLastSavedDate => getLastSavedDate())
  .then(lastSavedDate =>
    window.parent.postMessage({ lastSavedDate, ntbAPI: "ready" }, "*")
  )
  .catch(() =>
    window.parent.postMessage({ lastSavedDate: null, ntbAPI: "ready" }, "*")
  );
window.parent.postMessage({ ntbAPI: "ready" }, "*");
window.self.addEventListener(
  "message",
  async ev => {
    if (ev.data instanceof File) {
      await import("../app_global_state/initiateState.js").then(module =>
        module.default.initiateWithFile(ev.data)
      );
    } else if (ev.data === "useLastSavedState") {
      await import("../app_global_state/History.js").then(module =>
        module.default.recoverSavedState()
      );
    }
    await new Promise(done => {
      let timeout;
      const onTimeout = () => {
        templateComponents.unsubscribe(resetTimeout);
        done();
      };
      const resetTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(onTimeout, 100);
      };
      templateComponents.subscribe(resetTimeout);
    });

    getExportableHTML().then(html => ev.source.postMessage(html, ev.origin));
  },
  false
);
