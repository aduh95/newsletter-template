import { h, render } from "preact";

import "./index.css";
import "./modifier.scss";
import App from "./App.js";

// Disable fallback-message as the browser supports the app
// (browsers that don't won't be able to parse the script anyway)
document.getElementById("fallback-message").remove();

render(<App />, document.body);

import "./polyfill/bootstrap.js";

if (window.self !== window.top) {
  import("./api/ntbAPI.js");
}
