import { h } from "preact";
import { PureComponent } from "preact/compat";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

export default class ReOrder extends PureComponent {
  #savedScrollPosition;
  #requestScroll = false;
  #toggleReOrder = () =>
    this.props.editor.setState(
      state => {
        if (state.reOrder) {
          this.props.editor.commitChanges();
          this.#requestScroll = true;
          return { reOrder: false };
        } else {
          this.#savedScrollPosition = window.scrollY;
          return { reOrder: true };
        }
      },
      () =>
        this.#requestScroll &&
        !(this.#requestScroll = false) &&
        window.scrollTo(0, this.#savedScrollPosition)
    );

  render() {
    console.log("render");
    return (
      <button
        onClick={this.#toggleReOrder}
        style={this.props.editor.state.reOrder ? { borderStyle: "inset" } : {}}
        title="Toggle re-order mode"
        accessKey="r"
      >
        <FontAwesomeIcon icon={faSort} />
        &nbsp;Re-order components
      </button>
    );
  }
}
