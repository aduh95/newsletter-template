import { h, renderAsync } from "./utils/jsx.js";

import "./index.css";
import "./modifier.scss";
import App from "./App.js";

// Disable fallback-message as the browser supports the app
// (browsers that don't won't be able to parse the script anyway)
document.getElementById("fallback-message").remove();

document.body.append(renderAsync(<App />, undefined, console.error));

import "./polyfill/bootstrap.js";
