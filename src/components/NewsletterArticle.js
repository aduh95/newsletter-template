import { h, Component, Fragment } from "preact";

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
  static getDerivedStateFromProps(props) {
    return {
      title: props.title,
      description: getArray(props.description),
      isMain: !!props.isMain,
      isVideo: !!props.isVideo,
      illustration: props.illustration || null,
      illustrationDescription: props.illustrationDescription,
      links: getArray(props.links) || getArray(props.link),
    };
  }

  render() {
    return (
      <article
        className={this.state.isMain ? "main" : undefined}
        data-type="NewsletterArticle"
        data-json={JSON.stringify(this.props)}
      >
        <h4>{this.state.title}</h4>

        <Illustration
          isVideo={this.state.isVideo}
          src={this.state.illustration}
          alt={this.state.illustrationDescription}
        />

        {this.state.description.map(text => (
          <p>{text}</p>
        ))}

        <p>
          {this.state.links.map(link => (
            <>
              <a href={filterLink(link.href)} target="_blank" rel="noopener">
                {link.label}
              </a>
              .<br />
            </>
          ))}
        </p>
      </article>
    );
  }
}
