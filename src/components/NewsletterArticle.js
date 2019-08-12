import { h, Component, Fragment } from "preact";

import {
  clickHandler,
  dblClickHandler,
  touchHandler,
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

  update(data) {
    this.setState({
      writeMode: false,
      data: JSON.stringify(data),
    });
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
