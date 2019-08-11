import { h, Component, Fragment } from "preact";

export default class AddNewComponent extends Component {
  state = { newComponent: null };
  #handleChange = this.handleChange.bind(this);

  addNewComponent(data) {
    console.log(arguments);
    this.setState({
      newComponent: (
        <output data-request-render data-json={JSON.stringify(data)} />
      ),
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
              resetState={() => this.setState({ newComponent: null })}
              saveState={this.addNewComponent.bind(this)}
            />
          ),
        });
      })
      .catch(this.addNewComponent.bind(this, { type: value }));
  }

  render() {
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
