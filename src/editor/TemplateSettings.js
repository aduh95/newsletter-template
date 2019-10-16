import { h } from "../utils/jsx.js";

import { FontAwesomeIcon } from "@aduh95/jsx-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { EditableComponent } from "../edit_components/lazy-edit-component";

export default class TemplateSettingsAction extends EditableComponent {
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
        {this.getEditorComponent(
          () => ({
            active: this.state.editTemplate,
            props: this.#editTemplateProps,
          }),
          "TemplateSettings"
        )}
      </button>
    );
  }
}
