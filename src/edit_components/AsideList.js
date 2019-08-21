import { h, Component, createRef } from "preact";

import OrderedList from "./OrderedList.js";
import Modal from "../editor/Modal.js";
import normalizeURL from "./normalizeURL.js";

export default class UpdateAsideList extends Component {
  form = createRef();

  #handleReOrder = this.handleReOrder.bind(this);
  #handleChange = this.handleChange.bind(this);
  #handleSubmit = this.handleSubmit.bind(this);

  state = {
    type: this.props.type,
    title: this.props.title,
    content: Array.isArray(this.props.content)
      ? this.props.content.map(obj => ({ ...obj }))
      : [],
  };

  componentDidMount() {
    this.update();
  }
  componentDidUpdate(prevProps) {
    this.update(prevProps);
  }

  update(prevProps = {}) {
    const { current } = this.form;

    if (current && prevProps.focus !== this.props.focus) {
      const focusSelector = this.props.focus;

      const focusIndex = focusSelector?.match(/^(.+)\[(\d+)\]$/);
      const focusElement = focusIndex
        ? current
            .querySelectorAll(`input[name=${focusIndex[1]}]`)
            .item(focusIndex[2])
        : current.querySelector(`input[name=${focusSelector}]`);

      if (focusElement) {
        requestAnimationFrame(() => {
          if (this.props.focusOffset) {
            focusElement.setSelectionRange(...this.props.focusOffset);
          }
          focusElement.focus();
        });
      }
    }
  }

  handleChange(event, index) {
    const { name, value } = event.target;
    const { content } = this.state;

    if (index === content.length) {
      content.push({ [name]: value });
    } else {
      content[index][name] = value;
    }

    this.setState({ content });
  }

  handleSubmit() {
    const data = { ...this.state };
    data.content = this.state.content
      .filter(({ label, href }) => label || href)
      .map(({ label, href }) => ({
        label: label || "[Link]",
        href: normalizeURL(href) || "about:blank",
      }));

    requestAnimationFrame(() => this.props.saveState(data));
  }

  handleReOrder(from, to) {
    const currentContent = this.state.content;
    let content = [];

    if (to === -1) {
      content = content.concat(
        currentContent.slice(0, from),
        currentContent.slice(from + 1)
      );
    } else if (from < to) {
      content = content.concat(
        currentContent.slice(0, from),
        currentContent.slice(from + 1, to),
        currentContent.slice(from, 1),
        currentContent.slice(to)
      );
    } else if (from > to) {
      content = content.concat(
        currentContent.slice(0, to),
        currentContent.slice(from, from + 1),
        currentContent.slice(to, from),
        currentContent.slice(from + 1)
      );
    }

    if (from !== to) {
      this.setState({ content });
    }
  }

  render() {
    console.log("render");
    return (
      <Modal onClose={this.props.resetState}>
        <form method="dialog" ref={this.form} onSubmit={this.#handleSubmit}>
          <div>
            <label>
              Title:&nbsp;
              <input
                name="title"
                required
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </label>

            <OrderedList
              content={this.state.content}
              handleChange={this.#handleChange}
              handleReOrder={this.#handleReOrder}
            />

            <button type="submit">Save</button>
            <button type="reset" onClick={this.props.resetState}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}
