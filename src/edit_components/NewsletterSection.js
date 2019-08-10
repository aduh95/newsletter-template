import { h, Component, createRef } from "preact";

import registerDialogElement from "../polyfill/htmldialogelement.js";

export default class EditNewsletterSection extends Component {
  dialog = createRef();

  componentWillMount() {
    const { type, title, id, illustrationDescription } = this.props;
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

  handleIDChange(e) {
    const idInputField = e.target;

    if (
      this.props.id !== this.state.id &&
      document.getElementById(idInputField.value)
    ) {
      idInputField.setCustomValidity("ID already taken");
    } else {
      idInputField.setCustomValidity("");
    }
    this.handleChange(e);
  }

  handleSubmit(e) {
    const data = { ...this.state };

    this.props.saveState(data);
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
                required
                value={this.state.title}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>
              ID:&nbsp;
              <input
                name="id"
                required
                value={this.state.id}
                onChange={this.handleIDChange.bind(this)}
              />
            </label>

            <label>
              Image URL:&nbsp;
              <input
                onChange={this.handleChange.bind(this)}
                name="illustration"
                type="url"
                value={this.state.illustration}
              />
              <label>
                Image description:&nbsp;
                <input
                  onChange={this.handleChange.bind(this)}
                  name="illustrationDescription"
                  value={this.state.illustrationDescription}
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
