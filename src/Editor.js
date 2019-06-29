import { h, Component, Fragment } from "preact";

import Save from "./Save.js";
import Error from "./Error.js";

export default class Editor extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.warn(error);
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.warn(error, info);
  }

  render() {
    return this.state.hasError ? (
      <Error />
    ) : (
      <>
        <header>
          <h1>{this.props.title}</h1>
        </header>
        {this.props.children}
        <footer>
          <Save />
        </footer>
      </>
    );
  }
}
