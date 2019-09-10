import { h, Component, Fragment } from "../utils/jsx.js"

import {
  clickHandler,
  dblClickHandler,
  touchHandler,
} from "./eventHandlers.js";
import Edit from "../edit_components/lazy-edit-component.js";

export default class AsideList extends Component {
  state = { writeMode: false, data: JSON.stringify(this.props) };

  #clickHandler = clickHandler.bind(this);
  #dblClickHandler = dblClickHandler.bind(this);
  #touchHandler = touchHandler.bind(this);

  update(data) {
    this.setState({
      writeMode: false,
      data: JSON.stringify(data),
    });
  }

  render() {
    console.log("render");
    const list = this.props.content || [];

    return (
      <article
        data-type="AsideList"
        data-json={this.state.data}
        onClick={this.#clickHandler}
        onDblclick={this.#dblClickHandler}
        onTouchEnd={this.#touchHandler}
      >
        <h4 data-key="title">{this.props.title}</h4>

        <ul>
          {list.map(({ label, href }, i) => (
            <li>
              <a
                data-key={`label[${i}]`}
                href={href}
                target="_blank"
                rel="noopener"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <Edit
          componentName="AsideList"
          active={this.state.writeMode}
          props={{
            ...this.props,
            focus: this.state.focus,
            focusOffset: this.state.focusOffset,
            saveState: this.update.bind(this),
            resetState: () => this.setState({ writeMode: false }),
          }}
        />
      </article>
    );
  }
}
