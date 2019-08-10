import { h, Component, createRef } from "preact";

import EditMarkdown from "../markdown/EditMarkdownContent.js";
import registerDialogElement from "../polyfill/htmldialogelement.js";

const doNotPropagateEvent = event => event.stopPropagation();

export default class EditFooter extends Component {
  dialog = createRef();

  #handleSubmit = this.handleSubmit.bind(this);

  componentWillMount() {
    const { type, text } = this.props;
    this.setState({
      type,
      text,
    });
  }

  componentDidMount() {
    this.update();
  }
  componentDidUpdate(prevProps) {
    this.update(prevProps);
  }

  update(prevProps = {}) {
    const { current } = this.dialog;

    registerDialogElement(current).then(
      () => current && !current.open && current.showModal()
    );
  }

  handleSubmit() {
    const data = { ...this.state };

    requestIdleCallback(() => this.props.saveState(data));
  }

  render() {
    return (
      <dialog
        data-do-not-export
        data-ignore
        onClose={this.props.resetState}
        onClick={doNotPropagateEvent}
        ref={this.dialog}
      >
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
      </dialog>
    );
  }
}
