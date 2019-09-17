import { h, Component as PureComponent } from "../utils/jsx.js";
import { FontAwesomeIcon } from "@aduh95/jsx-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default class ReOrder extends PureComponent {
  #toggleReOrder = () =>
    this.props.editor.setState(state => {
      if (state.reOrder) {
        this.props.editor.commitChanges();
        return { reOrder: false };
      } else {
        return { reOrder: true };
      }
    });

  render() {
    console.log("render");
    return (
      <button
        onClick={this.#toggleReOrder}
        style={this.props.editor.state.reOrder ? { borderStyle: "inset" } : {}}
        title="Toggle re-order mode"
      >
        <FontAwesomeIcon icon={faSort} />
        &nbsp;Re-order components
      </button>
    );
  }
}
