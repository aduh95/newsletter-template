import { h, Component, Fragment } from "preact";
import MarkdownContent from "../markdown/MarkdownContent.js";
import Edit from "../edit_components/lazy-edit-compomponent.js";

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
      />
    );
  }
}

class FixedImage extends Component {
  render() {
    return <img alt={this.props.alt} src={this.props.src} loading="lazy" />;
  }
}

class Illustration extends Component {
  render() {
    return this.props.src ? (
      this.props.isVideo ? (
        <FixedImage {...this.props} />
      ) : (
        <VideoPlayer {...this.props} />
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

  render() {
    return (
      <article
        className={this.props.isMain ? "main" : undefined}
        data-type="NewsletterArticle"
        data-json={this.state.data}
        onClick={e => {
          e.preventDefault();
          let i = 0;
          while (e.path[i] && undefined === e.path[i].dataset?.key) {
            i++;
          }
          this.setState({ writeMode: true, focus: e.path[i]?.dataset?.key });
        }}
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
            saveState: this.update.bind(this),
            resetState: () => this.setState({ writeMode: false }),
          }}
        />
      </article>
    );
  }
}
