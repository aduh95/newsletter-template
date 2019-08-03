import { h, Component, createRef } from "preact";

import createDragHandler from "../createDragHandler.js";
import registerDialogElement from "../polyfill/htmldialogelement.js";

class OrderedList extends Component {
  handleDrag({ srcElement }, destination) {
    const siblings = Array.from(srcElement.parentNode.children);
    while (destination && destination.parentNode !== srcElement.parentNode) {
      destination = destination.parentNode;
    }

    const draggedElementIndex = siblings.indexOf(srcElement);
    const targetElementIndex = siblings.indexOf(destination);

    this.props.handleReOrder(draggedElementIndex, targetElementIndex);
  }

  render() {
    const list = this.props.content || [];

    return (
      <ol>
        {list.concat([{}]).map(({ label, href }, i) => (
          <li
            draggable
            onDragStart={createDragHandler(this.handleDrag.bind(this))}
            key={i}
          >
            <input
              name="label"
              value={label || ""}
              placeholder="Link label"
              onChange={e => this.props.handleChange(e, i)}
            />
            <input
              name="href"
              value={href || ""}
              placeholder="Link URL"
              onChange={e => this.props.handleChange(e, i)}
              type="url"
            />
          </li>
        ))}
      </ol>
    );
  }
}

export default class UpdateAsideList extends Component {
  dialog = createRef();

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

      focusElement?.focus();
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
    this.setState({ content });
  }

  onReset(e) {
    e.stopPropagation();
    this.props.resetState();
  }

  render() {
    return (
      <dialog
        data-ignore
        onClose={this.onReset.bind(this)}
        onClick={e => e.stopPropagation()}
        ref={this.dialog}
      >
        <form method="dialog" onSubmit={this.handleSubmit.bind(this)}>
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
              handleChange={this.handleChange.bind(this)}
              handleReOrder={this.handleReOrder.bind(this)}
            />

            <button type="submit">Save</button>
            <button type="reset" onClick={this.onReset.bind(this)}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    );
  }
}
