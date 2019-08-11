import statePersistance from "./StatePersistance.js";

let hostname;
const cacheHostName = () => {
  const { currentState } = statePersistance;
  hostname = currentState.hostname;
};
statePersistance.subscribe(cacheHostName);
cacheHostName();

export const getHostName = () => hostname;
export const getHostNameRegExp = () =>
  new RegExp(`(https?:)?//${hostName}/?`, "g");
