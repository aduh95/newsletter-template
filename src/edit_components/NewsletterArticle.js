import { h, Component, createRef } from "preact";

import OrderedList from "./OrderedList.js";
import EditMarkdown from "../markdown/EditMarkdownContent.js";
import registerDialogElement from "../polyfill/htmldialogelement.js";

class EditIllustration extends Component {
  static getDerivedStateFromProps({ src }) {
    return { noIllustration: !src };
  }

  disableIllustration(e) {
    this.props.onChange({
      src: undefined,
      alt: undefined,
      isVideo: undefined,
    });
  }

  switchToVideo(e) {
    this.props.onChange({
      src: "about:blank",
      alt: undefined,
      isVideo: true,
    });
    requestAnimationFrame(() => e.target.form.elements["src"].focus());
  }

  switchToImage(e) {
    this.props.onChange({
      src: "about:blank",
      alt: "",
      isVideo: false,
    });
    requestAnimationFrame(() => e.target.form.elements["src"].focus());
  }

  handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    this.props.onChange({ ...this.props, [name]: value });
  }

  render() {
    return (
      <fieldset>
        <legend>Illustration</legend>
        Illustration type:&nbsp;
        <label>
          <input
            onChange={this.disableIllustration.bind(this)}
            name="isVideo"
            type="radio"
            value="noIllustration"
            checked={this.state.noIllustration}
          />
          &nbsp;No illustration
        </label>
        <label>
          <input
            onChange={this.switchToImage.bind(this)}
            name="isVideo"
            type="radio"
            value="false"
            checked={!this.state.noIllustration && !this.props.isVideo}
          />
          &nbsp;Image
        </label>
        <label>
          <input
            onChange={this.switchToVideo.bind(this)}
            name="isVideo"
            type="radio"
            value="true"
            checked={!this.state.noIllustration && this.props.isVideo}
          />
          &nbsp;Video
        </label>
        {this.state.noIllustration ? null : (
          <label>
            {this.props.isVideo ? "Video" : "Image"} URL:&nbsp;
            <input
              onChange={this.handleChange.bind(this)}
              name="src"
              type="url"
              value={this.props.src}
            />
          </label>
        )}
        {this.state.noIllustration || this.props.isVideo ? null : (
          <label>
            Image description:&nbsp;
            <input
              onChange={this.handleChange.bind(this)}
              name="alt"
              value={this.props.alt}
              placeholder="Mandatory description of the image"
              required
            />
          </label>
        )}
      </fieldset>
    );
  }
}

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

      if (focusElement) {
        requestAnimationFrame(() => {
          if (this.props.focusOffset) {
            let offset = this.props.focusText
              ? focusElement.value.indexOf(
                  this.props.focusText,
                  this.props.focusOffset[0]
                ) - this.props.focusOffset[0]
              : 0;
            focusElement.setSelectionRange(
              ...this.props.focusOffset.map(e => e + offset)
            );
          }
          focusElement.focus();
        });
      }
    }
  }

  handleChange(event, index) {
    const { name, value } = event.target;
    const { links } = this.state;

    if (index === links.length) {
      links.push({ [name]: value });
    } else {
      links[index][name] = value;
    }

    this.setState({ links });
  }

  handleSubmit() {
    const data = { ...this.state };

    if (Array.isArray(this.state.links)) {
      data.links = this.state.links
        .filter(({ label, href }) => label || href)
        .map(({ label, href }) => ({
          label: label || "[Link]",
          href: href || "about:blank",
        }));
    }

    requestIdleCallback(() => this.props.saveState(data));
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
            <EditIllustration
              isVideo={this.state.isVideo}
              src={this.state.illustration}
              alt={this.state.illustrationDescription}
              onChange={({
                isVideo,
                src: illustration,
                alt: illustrationDescription,
              }) =>
                this.setState({
                  isVideo,
                  illustration,
                  illustrationDescription,
                })
              }
            />
            <label>
              Text:&nbsp;
              <EditMarkdown
                name="description"
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                initiallyActive={this.props.focus === "description"}
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
