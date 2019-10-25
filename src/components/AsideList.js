import { h, Component, Fragment } from "preact";

import {
  clickHandler,
  dblClickHandler,
  touchHandler,
  keyboardHandler,
} from "./eventHandlers.js";
import Edit from "../edit_components/lazy-edit-component.js";

export default class AsideList extends Component {
  state = { writeMode: false, data: JSON.stringify(this.props) };

  #clickHandler = clickHandler.bind(this);
  #dblClickHandler = dblClickHandler.bind(this);
  #touchHandler = touchHandler.bind(this);
  #keyboardHandler = keyboardHandler.bind(this);

  #closeDialog = () =>
    this.setState({ writeMode: false }, () => this.base.focus());

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
        onKeyUp={this.#keyboardHandler}
        tabIndex={0}
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
                tabIndex={-1}
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
            resetState: this.#closeDialog,
          }}
        />
      </article>
    );
  }
}
