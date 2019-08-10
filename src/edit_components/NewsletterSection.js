import { h, Component, createRef } from "preact";

import registerDialogElement from "../polyfill/htmldialogelement.js";

const doNotPropagateEvent = event => event.stopPropagation();

export default class EditNewsletterSection extends Component {
  dialog = createRef();

  #handleSubmit = this.handleSubmit.bind(this);
  #handleChange = this.handleChange.bind(this);
  #handleIDChange = this.handleIDChange.bind(this);

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

    idInputField.value = idInputField.value.replace(/\s/g, "-");

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

    requestAnimationFrame(() => this.props.saveState(data));
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
              Title:&nbsp;
              <input
                name="title"
                required
                value={this.state.title}
                onChange={this.#handleChange}
              />
            </label>
            <label>
              ID:&nbsp;
              <input
                name="id"
                required
                value={this.state.id}
                onChange={this.#handleIDChange}
              />
            </label>

            <label>
              Image URL:&nbsp;
              <input
                onChange={this.#handleChange}
                name="illustration"
                type="url"
                value={this.state.illustration}
              />
              <label>
                Image description:&nbsp;
                <input
                  onChange={this.#handleChange}
                  name="illustrationDescription"
                  value={this.state.illustrationDescription}
                  placeholder="Mandatory description of the image"
                  required
                />
              </label>
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
