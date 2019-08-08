import { h, Component, Fragment } from "preact";
import Edit from "../edit_components/lazy-edit-compomponent.js";

export default class AsideList extends Component {
  state = { writeMode: false, data: JSON.stringify(this.props) };

  clickHandler(e) {
    if (!e.ctrlKey) {
      e.preventDefault();

      const [el] = e.composedPath();

      el.contentEditable = "true";
      setTimeout(() => {
        el.contentEditable = "false";
      }, 300);
    }
  }

  dblClickHandler(e) {
    const focusOffset = [];
    e.preventDefault();
    if (window.getSelection) {
      const { anchorOffset, focusOffset: end } = getSelection();
      focusOffset.push(anchorOffset, end);
    }
    this.setState({
      writeMode: true,
      focus: e.composedPath()[0]?.dataset?.key,
      focusOffset,
    });
  }

  update(data) {
    this.setState({
      writeMode: false,
      data: JSON.stringify(data),
    });
  }

  render() {
    const list = this.props.content || [];

    return (
      <article
        data-type="AsideList"
        data-json={this.state.data}
        onClick={this.clickHandler.bind(this)}
        onDblclick={this.dblClickHandler.bind(this)}
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
