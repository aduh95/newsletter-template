import { h, Component, Fragment } from "preact";

import Save from "./Save.js";

export default class Editor extends Component {
  render() {
    return (
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
