import { h, Component, createRef } from "preact";

import OrderedList from "./OrderedList.js";
import EditMarkdown from "../markdown/EditMarkdownContent.js";
import Modal from "../editor/Modal.js";
import normalizeURL from "./normalizeURL.js";

function handleChange(onChange, e) {
  const { target } = e;
  const { name, value } = target;

  onChange({ ...this.props, [name]: value });
}

class EditIllustration extends Component {
  static getDerivedStateFromProps({ src }) {
    return { noIllustration: !src };
  }

  #handleChange = handleChange.bind(this, this.props.onChange);
  #disableIllustration = this.disableIllustration.bind(this);
  #switchToImage = this.switchToImage.bind(this);
  #switchToVideo = this.switchToVideo.bind(this);

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

  render() {
    return (
      <fieldset>
        <legend>Illustration</legend>
        Illustration type:&nbsp;
        <label>
          <input
            onChange={this.#disableIllustration}
            name="isVideo"
            type="radio"
            value="noIllustration"
            checked={this.state.noIllustration}
          />
          &nbsp;No illustration
        </label>
        <label>
          <input
            onChange={this.#switchToImage}
            name="isVideo"
            type="radio"
            value="false"
            checked={!this.state.noIllustration && !this.props.isVideo}
          />
          &nbsp;Image
        </label>
        <label>
          <input
            onChange={this.#switchToVideo}
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
              onChange={this.#handleChange}
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
              onChange={this.#handleChange}
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
  form = createRef();

  #handleChange = handleChange.bind(this, this.setState.bind(this));
  #handleSubmit = this.handleSubmit.bind(this);
  #handleListChange = this.handleListChange.bind(this);
  #handleListReOrder = this.handleListReOrder.bind(this);
  #handleIllustrationChange = ({
    isVideo,
    src: illustration,
    alt: illustrationDescription,
  }) =>
    this.setState({
      isVideo,
      illustration,
      illustrationDescription,
    });

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
      links: Array.isArray(links) ? links : [],
    });
  }

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

  handleListChange(event, index) {
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
          href: normalizeURLL(href) || "about:blank",
        }));
    }

    data.illustration = data.illustration
      ? normalizeURL(data.illustration)
      : undefined;

    requestAnimationFrame(() => this.props.saveState(data));
  }

  handleListReOrder(from, to) {
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

  render() {
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
                onChange={this.#handleChange}
              />
            </label>
            <label>
              Featured article:&nbsp;
              <input
                name="isMain"
                checked={this.state.isMain}
                type="checkbox"
                onChange={this.#handleChange}
              />
            </label>
            <EditIllustration
              isVideo={this.state.isVideo}
              src={this.state.illustration}
              alt={this.state.illustrationDescription}
              onChange={this.#handleIllustrationChange}
            />
            <label>
              Text:&nbsp;
              <EditMarkdown
                name="description"
                value={this.state.description}
                onChange={this.#handleChange}
                initiallyActive={this.props.focus === "description"}
              />
            </label>

            <OrderedList
              content={this.state.links}
              handleChange={this.#handleListChange}
              handleReOrder={this.#handleListReOrder}
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
