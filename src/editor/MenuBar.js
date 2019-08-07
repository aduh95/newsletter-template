import { h, Component, Fragment } from "preact";

import Save from "./Save.js";
import HistoryControl from "./HistoryControl.js";

export default class MenuBar extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Save editor={this.props.editor} />
        <HistoryControl />
      </>
    );
  }
}
