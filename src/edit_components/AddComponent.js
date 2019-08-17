import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";

export default class AddNewComponent extends PureComponent {
  state = { newComponent: null };

  #readyToConsumeState = false;
  #readyToCleanState = false;
  #handleChange = this.handleChange.bind(this);

  addNewComponent(data) {
    this.setState(
      {
        newComponent: (
          <output data-request-render data-json={JSON.stringify(data)} />
        ),
      },
      () => (this.#readyToConsumeState = true)
    );
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
              resetState={() => this.setState({ newComponent: null })}
              saveState={this.addNewComponent.bind(this)}
            />
          ),
        });
      })
      .catch(this.addNewComponent.bind(this, { type: value }));
  }

  componentDidUpdate() {
    if (this.#readyToCleanState) {
      this.setState(
        { newComponent: null },
        () => (this.#readyToCleanState = false)
      );
    } else if (this.#readyToConsumeState) {
      this.#readyToCleanState = true;
      this.#readyToConsumeState = false;
    }
  }

  render() {
    console.log("render");
    return (
      <>
        <select
          data-ignore
          data-do-not-export
          onChange={this.#handleChange}
          style="width:100%"
        >
          <option>Add new component</option>
          {this.props.components.map(name => (
            <option>{name}</option>
          ))}
        </select>
        {this.state.newComponent}
      </>
    );
  }
}
