import { h, Component } from "preact";

import Modal from "../editor/Modal.js";
import normalizeURL from "./normalizeURL.js";

export default class EditNewsletterSection extends Component {
  #handleSubmit = this.handleSubmit.bind(this);
  #handleChange = this.handleChange.bind(this);
  #handleIDChange = this.handleIDChange.bind(this);

  state = {
    type: this.props.type,
    title: this.props.title,
    id: this.props.id,
    illustration: this.props.illustration || null,
    illustrationDescription: this.props.illustrationDescription,
  };

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

    data.illustration = data.illustration
      ? normalizeURL(data.illustration)
      : "about:blank";

    requestAnimationFrame(() => this.props.saveState(data));
  }

  render() {
    console.log("render");
    return (
      <Modal onClose={this.props.resetState}>
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
      </Modal>
    );
  }
}
