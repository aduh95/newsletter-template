import Observable from "./Observer.js";

import templateName from "./templateName.js";
import templateHostName from "./templateHostName.js";
import templateComponents from "./templateComponents.js";
import templateCustomCSS from "./templateCustomCSS.js";

export default new (class InitiateState extends Observable {
  initiateWith({ name, hostname, css, components }) {
    this.notify(() => ({ name, hostname, css, components }));
    templateName.set(name);
    templateHostName.set(hostname);
    templateCustomCSS.set(css);
    templateComponents.set(components);
  }
})();
