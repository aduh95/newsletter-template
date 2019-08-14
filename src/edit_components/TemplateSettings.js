import { h, Component } from "preact";
import Modal from "../editor/Modal.js";

import templateCSS from "../app_global_state/templateCustomCSS.js";
import templateHostName from "../app_global_state/templateHostName.js";
import templateName from "../app_global_state/templateName.js";

export default class EditTemplateSettings extends Component {
  state = {
    css: templateCSS.get(),
    hostname: templateHostName.get(),
    name: templateName.get(),
  };

  #handleSubmit = () => {
    templateCSS.set(this.state.css);
    templateHostName.set(this.state.hostname);
    templateName.set(this.state.name);
  };

  #updateCSS = this.update.bind(this, "css");
  #updateHostName = this.update.bind(this, "hostname");
  #updateName = this.update.bind(this, "name");

  update(key, value) {
    this.setState({ [key]: value });
  }

  componentDidMount() {
    templateCSS.subscribe(this.#updateCSS);
    templateHostName.subscribe(this.#updateHostName);
    templateName.subscribe(this.#updateName);
  }

  componentWillUnmount() {
    templateCSS.unsubscribe(this.#updateCSS);
    templateHostName.unsubscribe(this.#updateHostName);
    templateName.unsubscribe(this.#updateName);
  }

  render() {
    console.log("render");
    return (
      <Modal onClose={this.props.resetState}>
        <form method="dialog" onSubmit={this.#handleSubmit}>
          <div>
            <label>
              Name:&nbsp;
              <input
                name="name"
                value={this.state.name}
                required
                onChange={this.#updateName}
              />
            </label>
            <label>
              Targeted domain name:&nbsp;
              <input
                name="hostname"
                required
                placeholder="E.G.: www.se.com"
                value={this.state.hostname}
                onChange={this.#updateHostName}
              />
            </label>
            <label>
              Custom CSS style:&nbsp;
              <textarea
                name="css"
                value={this.state.css}
                onChange={this.#updateCSS}
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
