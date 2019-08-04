import { h, Component, createRef } from "preact";

import OrderedList from "./OrderedList.js";
import registerDialogElement from "../polyfill/htmldialogelement.js";

export default class EditNewsletterArticle extends Component {
  dialog = createRef();

  componentWillMount() {
    const { type, title, description, links } = this.props;
    this.setState({
      type,
      title,
      description,
      isMain: !!this.props.isMain,
      isVideo: !!this.props.isVideo,
      illustration: this.props.illustration || null,
      illustrationDescription: this.props.illustrationDescription,
      links,
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
            .querySelectorAll(`[name=${focusIndex[1]}]`)
            .item(focusIndex[2])
        : current.querySelector(`[name=${focusSelector}]`);

      requestAnimationFrame(() => focusElement?.focus());
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
    data.links = this.state.links
      .filter(({ label, href }) => label || href)
      .map(({ label, href }) => ({
        label: label || "[Link]",
        href: href || "about:blank",
      }));

    requestAnimationFrame(() => this.props.saveState(data));
  }

  handleReOrder(from, to) {
    const currentContent = this.state.links;
    let links = [];

    if (to === -1) {
      links = links.concat(
        currentContent.slice(0, from),
        currentContent.slice(from + 1)
      );
    } else if (from < to) {
      links = links.concat(
        currentContent.slice(0, from),
        currentContent.slice(from + 1, to),
        currentContent.slice(from, 1),
        currentContent.slice(to)
      );
    } else if (from > to) {
      links = links.concat(
        currentContent.slice(0, to),
        currentContent.slice(from, from + 1),
        currentContent.slice(to, from),
        currentContent.slice(from + 1)
      );
    }

    if (from !== to) {
      this.setState({ links });
    }
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
            <label>
              Featured article:&nbsp;
              <input
                name="isMain"
                checked={this.state.isMain}
                type="checkbox"
                onChange={e => this.setState({ isMain: e.target.checked })}
              />
            </label>
            <label>Illustration</label>
            <label>
              Text:&nbsp;
              <textarea
                name="description"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
              />
            </label>

            <OrderedList
              content={this.state.links}
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
