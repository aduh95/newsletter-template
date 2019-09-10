import { h, Component, Fragment } from "../utils/jsx.js"

import HistoryControl from "./HistoryControl.js";
import Quit from "./Quit.js";
import ReOrder from "./ReOrder.js";
import Save from "./Save.js";
import TemplateSettings from "./TemplateSettings.js";

export default class MenuBar extends Component {
  componentDidMount() {}

  render() {
    console.log("render");
    return (
      <>
        <Save editor={this.props.editor} />
        <HistoryControl editor={this.props.editor} />
        &nbsp;|&nbsp;
        <TemplateSettings editor={this.props.editor} />
        <ReOrder editor={this.props.editor} />
        &nbsp;|&nbsp;
        <Quit editor={this.props.editor} />
      </>
    );
  }
}
