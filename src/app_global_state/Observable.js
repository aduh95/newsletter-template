export default class Observable {
  #observers = new Set();

  /**
   * @param {(notification:any)=>void} callback
   */
  subscribe(callback) {
    this.#observers.add(callback);
  }

  /**
   * @param {(notification:any)=>void} callback
   */
  unsubscribe(callback) {
    this.#observers.delete(callback);
  }

  /**
   * @protected
   * @param {any} func Object to be shared with all observers
   */
  notify(value) {
    this.#observers.forEach(func => func(value));
  }
}
