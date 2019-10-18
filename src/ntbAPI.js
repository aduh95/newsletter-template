import initiateState from "./app_global_state/initiateState.js";
import getExportableElements, {
  getExportableHTML,
} from "./getExportableElements.js";

export default async function ntbAPI(file) {
  await initiateState.initiateWithFile(file);
  await new Promise(d => requestIdleCallback(d));

  return getExportableElements();
}

window.parent.postMessage("ntbAPIReady", "*");
addEventListener(
  "message",
  async ev => {
    await initiateState.initiateWithFile(ev.data);
    await new Promise(d => requestIdleCallback(d));

    getExportableHTML().then(html => ev.source.postMessage(html, ev.origin));
  },
  false
);
