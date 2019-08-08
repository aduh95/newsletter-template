import { h, Component, Fragment } from "preact";

import Save from "./Save.js";
import ReOrder from "./ReOrder.js";
import HistoryControl from "./HistoryControl.js";
import Quit from "./Quit.js";

export default class MenuBar extends Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Save editor={this.props.editor} />
        <HistoryControl />
        &nbsp;|&nbsp;
        <ReOrder editor={this.props.editor} />
        &nbsp;|&nbsp;
        <Quit />
      </>
    );
  }
}
