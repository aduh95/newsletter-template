export const OPERATION_ADD = 1;
export const OPERATION_SET = 2;
export const OPERATION_REMOVE = 4;

export const OPERATION_OVERWRITE = 8;

export function mutateState(currentState, { type, path, value }) {
  switch (type) {
    case OPERATION_ADD:
      const newKey = path.pop();
      let stateComponent = currentState;
      for (const key of path) {
        stateComponent = currentState[key];
      }
      stateComponent[newKey] = value;
      return {
        type: OPERATION_REMOVE,
        path,
      };

    case OPERATION_SET:
      const key = path.pop();
      let stateComponent = currentState;
      for (const key of path) {
        stateComponent = currentState[key];
      }
      const oldValue = stateComponent[key];
      stateComponent[key] = value;
      return {
        type: OPERATION_SET,
        path,
        value: oldValue,
      };

    case OPERATION_REMOVE:
      const key = path.pop();
      let stateComponent = currentState;
      for (const key of path) {
        stateComponent = currentState[key];
      }
      const oldValue = stateComponent[key];
      delete stateComponent[key];
      return {
        type: OPERATION_ADD,
        path,
        value: oldValue,
      };

    case OPERATION_OVERWRITE:
      const oldState = Object.assign({}, currentState);
      Object.keys(currentState).map(key => {
        delete currentState[key];
      });
      Object.assign(currentState, value);
      return { type: OPERATION_OVERWRITE, value: oldState };
  }
}
