import { h, Component } from "preact";
import Worker from "./marked.worker.js";

const FROM_MARKDOWN_CLASS_NAME = "from-markdown-content";
const worker = new Worker();

export default class MarkdownContent extends Component {
  state = { loading: true };
  static #translationJobs = Promise.resolve();

  static translate(markdown) {
    this.#translationJobs = this.#translationJobs.then(
      () =>
        new Promise((resolve, reject) => {
          worker.onmessage = ({ data }) => {
            resolve(data);
          };
          worker.onmessageerror = reject;
          worker.onerror = reject;
          worker.postMessage(markdown);
        })
    );
    return this.#translationJobs;
  }

  componentDidMount() {
    this.translate();
  }
  componentDidUpdate() {
    this.translate();
  }
  translate() {
    this.constructor
      .translate(this.props.content)
      .then(html => {
        this.setState({ loading: false, html });
      })
      .catch(e => {
        console.error(e);
        this.setState({ loading: false, html: "<div data-ignore>Error</div>" });
      });
  }

  render() {
    return this.state.loading ? (
      <p data-ignore>Loading...</p>
    ) : (
      <output
        data-contents
        dangerouslySetInnerHTML={{ __html: this.state.html }}
        {...this.props.attributes}
      />
    );
  }
}
