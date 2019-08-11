import { h, Component } from "preact";

import EditMarkdown from "../markdown/EditMarkdownContent.js";
import Modal from "../editor/Modal.js";

const doNotPropagateEvent = event => event.stopPropagation();

export default class EditFooter extends Component {
  #handleSubmit = this.handleSubmit.bind(this);

  componentWillMount() {
    const { type, text } = this.props;
    this.setState({
      type,
      text,
    });
  }

  handleSubmit() {
    const data = { ...this.state };

    requestIdleCallback(() => this.props.saveState(data));
  }

  render() {
    return (
      <Modal onClose={this.props.resetState}>
        <form method="dialog" onSubmit={this.#handleSubmit}>
          <div>
            <label>
              Footer:&nbsp;
              <EditMarkdown
                name="description"
                value={this.state.text}
                onChange={e => this.setState({ text: e.target.value })}
                initialFocus={this.props.focusPosition}
                initiallyActive={true}
              />
            </label>

            <button type="submit">Save</button>
            <button type="reset" onClick={this.props.resetState}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}
