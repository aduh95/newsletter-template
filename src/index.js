import { h, render } from "preact";
import { install } from "offline-plugin/runtime";

import "./index.css";
import "./modifier.scss";
import "./newsletter.css";
import App from "./App.js";

render(<App />, document.body);

install();
import "./polyfill/bootstrap.js";
