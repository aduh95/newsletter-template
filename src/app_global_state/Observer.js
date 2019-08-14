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
    this.#observers.remove(callback);
  }

  /**
   * @param {()=>any} func Function that returns an object to share with all observers
   * @protected
   */
  notify(func) {
    this.#observer.forEach(func);
  }
}
