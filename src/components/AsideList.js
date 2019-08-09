import { h, Component, Fragment } from "preact";
import Edit from "../edit_components/lazy-edit-component.js";

const LEFT_CLICK_BUTTON = 1;
const DOUBLE_CLICK_TIMEOUT = 300;
const lastTouchDate = new WeakMap();

export default class AsideList extends Component {
  state = { writeMode: false, data: JSON.stringify(this.props) };

  touchHandler(e) {
    const [el] = e.composedPath();
    const lastTouchTimestamp = lastTouchDate.get(el) || 0;
    const currentTouchTimestamp = e.timeStamp || Date.now();
    lastTouchDate.set(el, currentTouchTimestamp);

    if (currentTouchTimestamp - lastTouchTimestamp < DOUBLE_CLICK_TIMEOUT) {
      this.dblClickHandler(e);
    }
  }

  clickHandler(e) {
    if (!this.state.writeMode && !e.ctrlKey && e.which === LEFT_CLICK_BUTTON) {
      e.preventDefault();

      const [el] = e.composedPath();

      if (el.nodeName === "A") {
        setTimeout(() => {
          if (!this.state.writeMode) {
            import("../notify")
              .then(m => m.default)
              .then(notify => notify("Use Ctrl+Click to open the link"));
          }
        }, DOUBLE_CLICK_TIMEOUT);
      }
    }
  }

  dblClickHandler(e) {
    if (!this.state.writeMode) {
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
        onTouchEnd={this.touchHandler.bind(this)}
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
