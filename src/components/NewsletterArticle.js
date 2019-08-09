import { h, Component, Fragment } from "preact";
import MarkdownContent from "../markdown/MarkdownContent.js";
import Edit from "../edit_components/lazy-edit-component.js";

const LEFT_CLICK_BUTTON = 1;
const DOUBLE_CLICK_TIMEOUT = 300;
const lastTouchDate = new WeakMap();

const getArray = obj => (obj ? (Array.isArray(obj) ? obj : [obj]) : []);

const filterLink = href => href;

class VideoPlayer extends Component {
  render() {
    return (
      <iframe
        src={this.props.src}
        frameborder="0"
        width="300"
        height="175"
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        loading="lazy"
        data-key="src"
      />
    );
  }
}

class FixedImage extends Component {
  render() {
    return (
      <img
        alt={this.props.alt}
        src={this.props.src}
        loading="lazy"
        data-key="src"
      />
    );
  }
}

class Illustration extends Component {
  render() {
    return this.props.src ? (
      this.props.isVideo ? (
        <VideoPlayer {...this.props} />
      ) : (
        <FixedImage {...this.props} />
      )
    ) : null;
  }
}

export default class NewsletterArticle extends Component {
  state = {
    writeMode: false,
    data: JSON.stringify(this.props),
  };

  update(data) {
    this.setState({
      writeMode: false,
      data: JSON.stringify(data),
    });
  }

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
        el.contentEditable = "true";
        setTimeout(() => {
          el.contentEditable = "false";
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
      const path = e.composedPath();
      let i = 0;
      while (path[i] && undefined === path[i].dataset?.key) {
        i++;
      }

      e.preventDefault();
      if (window.getSelection) {
        let nodeOffset = 0;
        const selection = getSelection();
        const { anchorOffset, focusOffset: end } = selection;
        if (i > 0) {
          let node = path[0];
          do {
            const { previousSibling } = node;
            nodeOffset += previousSibling?.textContent?.length || 0;
            node = previousSibling || node.parentNode;
          } while (node && node !== path[i]);
          this.setState({ focusText: selection.toString() });
        }
        focusOffset.push(nodeOffset + anchorOffset, nodeOffset + end);
      }
      this.setState({
        writeMode: true,
        focus: path[i]?.dataset?.key,
        focusOffset,
      });
    }
  }

  render() {
    return (
      <article
        className={this.props.isMain ? "main" : undefined}
        data-type="NewsletterArticle"
        data-json={this.state.data}
        onClick={this.clickHandler.bind(this)}
        onDblclick={this.dblClickHandler.bind(this)}
        onTouchEnd={this.touchHandler.bind(this)}
      >
        <h4 data-key="title">{this.props.title}</h4>

        <Illustration
          isVideo={this.props.isVideo}
          src={this.props.illustration}
          alt={this.props.illustrationDescription}
        />

        <MarkdownContent
          content={this.props.description}
          attributes={{ ["data-key"]: "description" }}
        />

        <p>
          {getArray(this.props.links).map((link, i) => (
            <>
              <a
                data-key={`label[${i}]`}
                href={filterLink(link.href)}
                target="_blank"
                rel="noopener"
              >
                {link.label}
              </a>
              .<br />
            </>
          ))}
        </p>

        <Edit
          componentName="NewsletterArticle"
          active={this.state.writeMode}
          props={{
            ...this.props,
            focus: this.state.focus,
            focusOffset: this.state.focusOffset,
            focusText: this.state.focusText,
            saveState: this.update.bind(this),
            resetState: () => this.setState({ writeMode: false }),
          }}
        />
      </article>
    );
  }
}
