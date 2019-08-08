import { h, Component, createRef } from "preact";

import EditMarkdown from "../markdown/EditMarkdownContent.js";
import registerDialogElement from "../polyfill/htmldialogelement.js";

export default class EditFooter extends Component {
  dialog = createRef();

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

  onReset(e) {
    e.stopPropagation();
    this.props.resetState();
  }

  render() {
    return (
      <dialog
        data-ignore
        onClose={this.onReset.bind(this)}
        onClick={e => e.stopPropagation()}
        ref={this.dialog}
      >
        <form method="dialog" onSubmit={this.handleSubmit.bind(this)}>
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
            <button type="reset" onClick={this.onReset.bind(this)}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    );
  }
}
