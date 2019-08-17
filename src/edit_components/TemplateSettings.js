import { h, Component } from "preact";
import Modal from "../editor/Modal.js";

import templateCSS from "../app_global_state/templateCustomCSS.js";
import templateHostName from "../app_global_state/templateHostName.js";
import templateName from "../app_global_state/templateName.js";

export default class EditTemplateSettings extends Component {
  state = {
    css: templateCSS.get(),
    hostname: templateHostName.getAsURL()?.toString() || "",
    name: templateName.get(),
  };

  #handleSubmit = () => {
    this.componentWillUnmount();
    templateCSS.set(this.state.css);
    templateHostName.set(this.state.hostname);
    templateName.set(this.state.name);
    this.componentDidMount();
    if (this.props.saveChange) {
      requestAnimationFrame(this.props.saveChange);
    }
  };

  #updateCSS = this.update.bind(this, "css");
  #updateHostName = this.update.bind(this, "hostname");
  #updateName = this.update.bind(this, "name");

  update(key, ev) {
    const value = "string" === typeof ev ? ev : ev?.target?.value;
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
                type="url"
                placeholder="E.G.: https://se.com"
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
            {this.props.previousStateDate ? (
              <button type="button" onClick={this.props.recoverSavedState}>
                Recover last template
              </button>
            ) : null}
          </div>
        </form>
      </Modal>
    );
  }
}
