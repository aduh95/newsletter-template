import { h, Component } from "preact";
import Modal from "../editor/Modal.js";

export default class TemplateSettings extends Component {
  #handleSubmit = () => {
    import("../notify.js")
      .then(module => module.default)
      .then(notify => notify("Not implmented yet"));
  };

  render() {
    return (
      <Modal onClose={this.props.resetState}>
        <form method="dialog" onSubmit={this.#handleSubmit}>
          <div>
            <label>
              Name:&nbsp;
              <input name="name" />
            </label>
            <label>
              Targeted domain name:&nbsp;
              <input name="hostname" required placeholder="E.G.: www.se.com" />
            </label>
            <label>
              Custom CSS style:&nbsp;
              <textarea name="css" />
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
