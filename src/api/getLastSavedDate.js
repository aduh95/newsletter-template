import { PERSISTANT_STORAGE_NAME } from "../app_global_state/StatePersistance-const.js";

const canAccessDatabases = "function" === typeof window.indexedDB?.databases;

/**
 * @return {Promise<Date>} The last saved state date if exists, otherwise the Promise gets rejected
 */
export default function getLastSavedDate() {
  const doesDatabaseExist = canAccessDatabases
    ? indexedDB
        .databases()
        .then(databases =>
          databases.find(({ name }) => name === PERSISTANT_STORAGE_NAME)
        )
    : Promise.resolve(true); // let's assume it exists

  return doesDatabaseExist
    .then(result =>
      result
        ? import("../app_global_state/History.js")
        : Promise.reject("No saved state")
    )
    .then(module => module.default)
    .then(appStateHistory => appStateHistory.getLastSavedDate());
}
