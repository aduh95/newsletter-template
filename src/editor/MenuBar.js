import { h, Component, Fragment } from "preact";

import Save from "./Save.js";

export default class MenuBar extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Save editor={this.props.editor} />
      </>
    );
  }
}
