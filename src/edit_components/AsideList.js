import { h, Component, createRef } from "preact";

import OrderedList from "./OrderedList.js";
import registerDialogElement from "../polyfill/htmldialogelement.js";

const doNotPropagateEvent = event => event.stopPropagation();

export default class UpdateAsideList extends Component {
  dialog = createRef();

  #handleReOrder = this.handleReOrder.bind(this);
  #handleChange = this.handleChange.bind(this);
  #handleSubmit = this.handleSubmit.bind(this);

  componentWillMount() {
    const { type, title, content } = this.props;
    this.setState({
      type,
      title,
      content: Array.isArray(content) ? content.map(obj => ({ ...obj })) : [],
    });
  }

  componentDidMount() {
    this.update();
  }
  componentDidUpdate(prevProps) {
    this.update(prevProps);
  }

  update(prevProps = {}) {
    const { current } = this.dialog;

    registerDialogElement(current).then(
      () => current && !current.open && current.showModal()
    );

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
        href: href || "about:blank",
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
    return (
      <dialog
        data-ignore
        onClose={this.props.resetState}
        onClick={doNotPropagateEvent}
        ref={this.dialog}
      >
        <form method="dialog" onSubmit={this.#handleSubmit}>
          <div>
            <label>
              Title:&nbsp;
              <input
                name="title"
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
      </dialog>
    );
  }
}
