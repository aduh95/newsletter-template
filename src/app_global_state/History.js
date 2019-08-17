import Observable from "./Observable.js";

import initiateState from "./initiateState.js";
import templateName from "./templateName.js";
import templateHostName from "./templateHostName.js";
import templateComponents from "./templateComponents.js";
import templateCustomCSS from "./templateCustomCSS.js";

import {
  HISTORY_FORWARD,
  HISTORY_REWIND,
  SAVE_NAME,
  SAVE_HOSTNAME,
  SAVE_CSS,
  SAVE_COMPONENTS,
  COMMAND_OF_TYPE_SAVE,
  COMMAND_OF_TYPE_HISTORY,
  PERSISTANCE_INITIATE_FROM_DATASET,
  PERSISTANCE_INITIATE_FROM_SCRATCH,
  PERSISTANCE_GET_LAST_SAVE_DATE,
  PERSISTANCE_CLEAR_SAVED_STATE,
} from "./commands.js";

import Worker from "./StatePersistance.worker.js";

const worker = new Worker();

let currentWorkerJob = Promise.resolve();

export default new (class History extends Observable {
  #state = {
    isOutdated: true,
    hasPreviousState: false,
    hasNextState: false,
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
    if (command & (COMMAND_OF_TYPE_SAVE | COMMAND_OF_TYPE_HISTORY)) {
      return job.then(data => this.#set(data));
    } else {
      return job;
    }
  }
  #initiateState = dataset => {
    this.#unsubscribeToObservables();
    return this.#sendCommand(
      PERSISTANCE_INITIATE_FROM_DATASET,
      dataset
    ).finally(this.#subscribeToObservables.bind(this));
  };

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
    Object.assign(this.#state, {
      isOutdated: false,
      hasPreviousState: hasPrevious,
      hasNextState: hasNext,
    });
    this.notify(this.#state);
  }

  #subscribeToObservables() {
    initiateState.subscribe(this.#initiateState);
    templateName.subscribe(this.#sendCommand.bind(this, SAVE_NAME));
    templateHostName.subscribe(this.#sendCommand.bind(this, SAVE_HOSTNAME));
    templateCustomCSS.subscribe(this.#sendCommand.bind(this, SAVE_CSS));
    templateComponents.subscribe(this.#sendCommand.bind(this, SAVE_COMPONENTS));
  }

  #unsubscribeToObservables() {
    initiateState.unsubscribe(this.#initiateState);
    templateName.unsubscribe(this.#sendCommand.bind(this, SAVE_NAME));
    templateHostName.unsubscribe(this.#sendCommand.bind(this, SAVE_HOSTNAME));
    templateCustomCSS.unsubscribe(this.#sendCommand.bind(this, SAVE_CSS));
    templateComponents.unsubscribe(
      this.#sendCommand.bind(this, SAVE_COMPONENTS)
    );
  }

  constructor() {
    super();
    this.#subscribeToObservables();
  }

  get() {
    return this.#state;
  }

  getLastSavedDate() {
    return this.#sendCommand(PERSISTANCE_GET_LAST_SAVE_DATE).then(
      timestamp => timestamp && new Date(timestamp)
    );
  }

  rewindToPreviousState() {
    return this.#sendCommand(HISTORY_REWIND);
  }

  forwardToNextState() {
    return this.#sendCommand(HISTORY_FORWARD);
  }

  clearCurrentSession() {
    this.#unsubscribeToObservables();
    return this.#sendCommand(PERSISTANCE_INITIATE_FROM_SCRATCH)
      .then(() => initiateState.initiateWith({}))
      .finally(this.#subscribeToObservables.bind(this));
  }

  clearSavedState() {
    return this.#sendCommand(PERSISTANCE_CLEAR_SAVED_STATE);
  }

  recoverSavedState() {
    return this.#sendCommand(INITIATE_RESTORE_SAVED_STATE);
  }
})();
