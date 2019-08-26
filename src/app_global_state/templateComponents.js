import Observable from "./Observable.js";

import {
  OPERATION_ADD,
  OPERATION_OVERWRITE,
  OPERATION_SET,
  OPERATION_REMOVE,
} from "./component-operations.js";

export default new (class TemplateComponents extends Observable {
  set(newData) {
    this.notify({
      type: OPERATION_OVERWRITE,
      value: newData,
    });
  }

  addItem(path, value) {
    this.notify({
      type: OPERATION_ADD,
      path,
      value,
    });
  }
  updateItem(path, value) {
    this.notify({
      type: OPERATION_SET,
      path,
      value,
    });
  }
  removeItem(path) {
    this.notify({
      type: OPERATION_REMOVE,
      path,
    });
  }

  get() {
    return this.#components;
  }
})();
