import {
  h,
  lazy,
  StatefulComponent,
  Component,
  renderAsync,
} from "../utils/jsx.js";

import LoadingDialog from "../LoadingDialog.js";

const ASYNC_COMP = new Map();

export default class EditorComponent extends StatefulComponent {
  #EditComponent;

  componentDidMount() {
    const { componentName, componentToEdit } = this.props;

    if (!ASYNC_COMP.has(componentName)) {
      ASYNC_COMP.set(
        componentName,
        lazy(() => import(`./${componentName}.js`))
      );
    }

    this.#EditComponent = ASYNC_COMP.get(componentName);

    if (componentToEdit) {
      this._state = componentToEdit.state;
      Object.defineProperty(componentToEdit, "state", {
        get: () => this.state,
        set: value => (this.state = value),
      });

      componentToEdit.setState = this.setState.bind(this);
    }
  }

  render() {
    const EditComponent = this.#EditComponent;
    const { active, props } = this.props.propsToApply();

    return active
      ? renderAsync(
          <EditComponent {...props} />,
          <LoadingDialog />,
          console.error
        )
      : document.createDocumentFragment();
  }
}

export class EditableComponent extends Component {
  setState() {
    throw new Error("Trying to set state before calling `getEditorComponent`");
  }
  getEditorComponent(getProps, componentName = this.constructor.name) {
    return (
      <EditorComponent
        componentName={componentName}
        componentToEdit={this}
        propsToApply={getProps}
      />
    );
  }
}
