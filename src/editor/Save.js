import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";

import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faDownload, faFileExport } from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param {HTMLElement} node
 */
const cleanHTML = node => {
  if (
    "function" === typeof node.hasAttribute &&
    node.hasAttribute("data-contents")
  ) {
    return Array.from(node.childNodes, cleanHTML);
  } else if (
    node.nodeName === "OUTPUT" ||
    ("function" === typeof node.hasAttribute &&
      node.hasAttribute("data-do-not-export"))
  ) {
    return [];
  }

  const clone = node.cloneNode(false);
  if (node.attributes) {
    for (const { name } of node.attributes) {
      if (name.startsWith("data-")) {
        clone.removeAttribute(name);
      }
    }
    clone.removeAttribute("contenteditable");
  }
  Array.from(node.childNodes)
    .flatMap(cleanHTML)
    .forEach(el => clone.appendChild(el));
  if (node instanceof HTMLImageElement) {
    clone.setAttribute("height", node.naturalHeight);
    clone.setAttribute("width", node.naturalWidth);
  }

  return clone;
};

const getTemplateName = () =>
  import("../app_global_state/templateName.js")
    .then(module => module.default)
    .then(templateName => templateName.get());

const getCurrentState = () =>
  import("../app_global_state/History.js")
    .then(module => module.default)
    .then(history => history.getCurrentStateAsArrayBuffer());

const getHostNameRegExp = flags =>
  import("../app_global_state/templateHostName.js")
    .then(module => module.default)
    .then(templateHostName => templateHostName.getHostNameRegExp(flags));

export default class Save extends PureComponent {
  exportJSONFile = () =>
    Promise.all([getTemplateName(), getCurrentState()]).then(
      ([name, fileContent]) =>
        this.#exportFile(name + ".json", "application/json", fileContent)
    );

  exportHTMLFile = () =>
    Promise.all([getTemplateName(), getHostNameRegExp("g")]).then(
      ([name, hostname]) =>
        this.#exportFile(name + ".html", "text/html", this.#getHTML(hostname))
    );

  #getHTML(hostname) {
    const exportedElements = document.querySelectorAll("[data-export]");

    return Array.from(exportedElements)
      .flatMap(cleanHTML)
      .map(el => el.outerHTML.replace(hostname, "/"));
  }

  #exportFile(fileName, type, fileContent) {
    const a = document.createElement("a");
    const file = new File(fileContent, fileName, { type });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    document.body.append(a);
    a.click();
    requestIdleCallback(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    });
  }

  render() {
    console.log("render");
    return (
      <>
        <button onClick={this.exportJSONFile} title="Export as JSON">
          <FontAwesomeIcon icon={faDownload} />
          &nbsp;Save
        </button>
        <button onClick={this.exportHTMLFile} title="Export as HTML">
          <FontAwesomeIcon icon={faFileExport} />
          &nbsp;Export
        </button>
      </>
    );
  }
}
