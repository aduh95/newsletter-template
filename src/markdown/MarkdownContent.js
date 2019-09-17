import { h, Component } from "../utils/jsx.js";
import Worker from "./marked.worker.js";

const worker = new Worker();

export default class MarkdownContent extends Component {
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

  render() {
    console.log("render");
    return this.constructor
      .translate(this.props.content)
      .then(html => {
        const template = document.createElement("output");
        template.dataset.contents = true;
        template.innerHTML = html;

        Object.entries(this.props.attributes).forEach(([key, value]) =>
          template.setAttribute(key, value)
        );
        return template;
      })
      .catch(e => {
        console.error(e);
        return (
          <div data-ignore class="error">
            Error when rendering markdown content
          </div>
        );
      });
  }
}
