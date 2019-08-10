import { h, Component, Fragment } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default class ReOrder extends Component {
  #toggleReOrder = () =>
    this.props.editor.setState({
      reOrder: !this.props.editor.state.reOrder,
    });

  render() {
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
