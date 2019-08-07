import { h, render } from "preact";

import "./index.css";
import "./modifier.scss";
import "./newsletter.css";
import App from "./App.js";

render(<App />, document.body);

if (!("requestIdleCallback" in window)) {
  import("./polyfill/window-requestIdleCallback.js");
}
