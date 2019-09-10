import { h, Component } from "../utils/jsx.js"
import Worker from "./marked.worker.js";

const worker = new Worker();

export default class MarkdownContent extends Component {
  state = { loading: true };
  static #translationJobs = Promise.resolve();

  static translate(markdown) {
    let done;
    const waitForFulfillment = new Promise(resolve => (done = resolve));
    const job = this.#translationJobs
      .then(
        () =>
          new Promise((resolve, reject) => {
            worker.onmessage = ({ data }) => {
              resolve(data);
            };
            worker.onmessageerror = reject;
            worker.onerror = reject;
            worker.postMessage(markdown);
          })
      )
      .finally(done);
    this.#translationJobs = waitForFulfillment;
    return job;
  }

  componentDidMount() {
    this.translate();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.translate();
    }
  }
  translate() {
    this.constructor
      .translate(this.props.content)
      .then(html => {
        this.setState({ loading: false, html });
      })
      .catch(e => {
        console.error(e);
        this.setState({
          loading: false,
          html:
            "<div data-ignore class='error'>Error when rendering markdown content</div>",
        });
      });
  }

  render() {
    console.log("render");
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
