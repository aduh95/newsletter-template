import Observable from "./Observer.js";

import templateName from "./templateName.js";
import templateHostName from "./templateHostName.js";
import templateComponents from "./templateComponents.js";
import templateCustomCSS from "./TemplateCustomCSS.js";

import {
  HISTORY_FORWARD,
  HISTORY_REWIND,
  SAVE_NAME,
  SAVE_HOSTNAME,
  SAVE_CSS,
  SAVE_COMPONENTS,
} from "./commands.js";

import Worker from "./StatePersistance.worker.js";

const worker = new Worker();

let currentWorkerJob = Promise.resolve();

export default new (class History extends Observable {
  #state = {
    isOutdated: true,
    hasPrevious: false,
    hasNext: false,
  };

  #sendCommand(command, message = null) {
    let done;
    const waitForFulfillment = new Promise(resolve => (done = resolve));
    const job = currentWorkerJob
      .then(
        () =>
          new Promise((resolve, reject) => {
            worker.onmessage = ({ data }) => {
              resolve(data);
            };
            worker.onmessageerror = reject;
            worker.onerror = reject;

            worker.postMessage([command, message]);
          })
      )
      .finally(done);
    currentWorkerJob = waitForFulfillment;
    return job.then(({ data }) => this.#set(data));
  }

  #set({ name, hostname, css, components, hasPrevious, hasNext }) {
    if (name) {
      templateName.set(name);
    }
    if (hostname) {
      templateHostName.set(hostname);
    }
    if (css) {
      templateCustomCSS.set(css);
    }
    if (components) {
      templateComponents.set(components);
    }
    Object.assign(this.#state, { isOutdated: false, hasPrevious, hasNext });
    this.notify(() => this.#state);
  }

  constructor() {
    templateName.subscribe(sendCommand.bind(this, SAVE_NAME));
    templateHostName.subscribe(sendCommand.bind(this, SAVE_HOSTNAME));
    templateCustomCSS.subscribe(sendCommand.bind(this, SAVE_CSS));
    templateComponents.subscribe(sendCommand.bind(this, SAVE_COMPONENTS));
  }

  get() {
    return this.#state;
  }

  rewindToPreviousState() {
    return sendCommand(HISTORY_REWIND);
  }

  forwardToNextState() {
    return sendCommand(HISTORY_FORWARD);
  }
})();
