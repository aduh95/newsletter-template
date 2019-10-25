import { h, Fragment, createRef } from "preact";
import { PureComponent } from "preact/compat";

export default class AddNewComponent extends PureComponent {
  state = { newComponent: null };

  #selectRef = createRef();

  #handleChange = this.handleChange.bind(this);

  addNewComponent(data) {
    this.props.onChange(data);
    this.setState({
      newComponent: null,
    });
  }

  handleChange(event) {
    const { target } = event;
    const { value } = target;
    target.selectedIndex = 0;

    import(`./${value}.js`)
      .then(module => module.default)
      .then(EditComponent => {
        this.setState({
          newComponent: (
            <EditComponent
              type={value}
              resetState={() =>
                this.setState({ newComponent: null }, () =>
                  requestAnimationFrame(() => this.#selectRef.current?.focus())
                )
              }
              saveState={this.addNewComponent.bind(this)}
            />
          ),
        });
      })
      .catch(this.addNewComponent.bind(this, { type: value }));
  }

  render() {
    console.log("render");
    return (
      <>
        <select
          data-ignore
          data-do-not-export
          onChange={this.#handleChange}
          ref={this.#selectRef}
          style="width:100%"
        >
          <option>Add new component</option>
          {this.props.components.map(name => (
            <option value={name}>{name}</option>
          ))}
        </select>
        {this.state.newComponent}
      </>
    );
  }
}
