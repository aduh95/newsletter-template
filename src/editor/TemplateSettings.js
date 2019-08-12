import { h } from "preact";
import { PureComponent } from "preact/compat";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import EditTemplateSettings from "../edit_components/lazy-edit-component";

export default class TemplateSettingsAction extends PureComponent {
  state = { editTemplate: null };

  #editTemplate = () => this.setState({ editTemplate: true });
  #editTemplateProps = {
    resetState: () => this.setState({ editTemplate: false }),
  };

  render() {
    console.log("render");
    return (
      <button onClick={this.#editTemplate} title="Edit template settings">
        <FontAwesomeIcon icon={faCog} />
        &nbsp;Settings
        <EditTemplateSettings
          componentName="TemplateSettings"
          active={this.state.editTemplate}
          props={this.#editTemplateProps}
        />
      </button>
    );
  }
}
