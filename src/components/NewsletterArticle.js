import { h, Component, Fragment } from "preact";

import {
  clickHandler,
  dblClickHandler,
  touchHandler,
  keyboardHandler,
} from "./eventHandlers.js";
import MarkdownContent from "../markdown/MarkdownContent.js";
import Edit from "../edit_components/lazy-edit-component.js";

const getArray = obj => (obj ? (Array.isArray(obj) ? obj : [obj]) : []);

const filterLink = href => href;

class VideoPlayer extends Component {
  render() {
    console.log("render", this.constructor.name);
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
    console.log("render", this.constructor.name);
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
    console.log("render", this.constructor.name);
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

  #clickHandler = clickHandler.bind(this);
  #dblClickHandler = dblClickHandler.bind(this);
  #touchHandler = touchHandler.bind(this);
  #keyboardHandler = keyboardHandler.bind(this);

  #update = this.update.bind(this);
  #closeDialog = () => this.setState({ writeMode: false }, this.focus);

  update(data) {
    this.setState(
      {
        writeMode: false,
        data: JSON.stringify(data),
      },
      this.focus
    );
  }

  focus() {
    addEventListener(
      "keyup",
      () => {
        requestIdleCallback(() => this.base.focus());
      },
      {
        once: true,
      }
    );
  }

  render() {
    console.log("render", this.constructor.name);
    return (
      <article
        className={this.props.isMain ? "main" : undefined}
        data-type="NewsletterArticle"
        data-json={this.state.data}
        onClick={this.#clickHandler}
        onDblclick={this.#dblClickHandler}
        onTouchEnd={this.#touchHandler}
        onKeyUp={this.#keyboardHandler}
        tabIndex={0}
      >
        <h4 data-key="title">{this.props.title}</h4>

        <Illustration
          isVideo={this.props.isVideo}
          src={this.props.illustration}
          alt={this.props.illustrationDescription}
        />

        <div>
          <MarkdownContent
            content={this.props.description}
            attributes={{ ["data-key"]: "description" }}
          />
        </div>

        <p>
          {getArray(this.props.links).map((link, i) => (
            <>
              <a
                data-key={`label[${i}]`}
                href={filterLink(link.href)}
                target="_blank"
                rel="noopener"
                tabIndex={-1}
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
            saveState: this.#update,
            resetState: this.#closeDialog,
          }}
        />
      </article>
    );
  }
}
