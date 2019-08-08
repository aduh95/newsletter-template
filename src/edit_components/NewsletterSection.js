import { h, Component, createRef } from "preact";

import registerDialogElement from "../polyfill/htmldialogelement.js";

export default class EditNewsletterSection extends Component {
  dialog = createRef();

  componentWillMount() {
    const { type, title, illustrationDescription } = this.props;
    this.setState({
      type,
      title,
      id,
      illustration: this.props.illustration || null,
      illustrationDescription,
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

  handleChange(event, index) {
    const { name, value } = event.target;

    this.setState({ [name]: value });
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
              Title:&nbsp;
              <input
                name="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </label>
            <label>
              ID:&nbsp;
              <input
                name="title"
                value={this.state.id}
                onChange={e => this.setState({ id: e.target.value })}
              />
            </label>

            <label>
              Image URL:&nbsp;
              <input
                onChange={this.handleChange.bind(this)}
                name="src"
                type="url"
                value={this.props.src}
              />
              <label>
                Image description:&nbsp;
                <input
                  onChange={this.handleChange.bind(this)}
                  name="alt"
                  value={this.props.alt}
                  placeholder="Mandatory description of the image"
                  required
                />
              </label>
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
