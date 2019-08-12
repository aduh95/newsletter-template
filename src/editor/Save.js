import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";

import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faDownload, faFileExport } from "@fortawesome/free-solid-svg-icons";

import { getHostNameRegExp } from "../currentStateHostName";

/**
 *
 * @param {HTMLElement} node
 */
const cleanHTML = node => {
  if (
    node.nodeName === "OUTPUT" ||
    ("function" === typeof node.hasAttribute &&
      node.hasAttribute("data-do-not-export"))
  ) {
    return document.createDocumentFragment();
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
  for (const child of node.childNodes) {
    clone.appendChild(cleanHTML(child));
  }

  return clone;
};

export default class Save extends PureComponent {
  exportJSONFile = () =>
    this.#exportFile("editorialCalendar.json", "application/json", [
      JSON.stringify(this.props.editor.data),
    ]);

  exportHTMLFile = () =>
    this.#exportFile("editorialCalendar.html", "text/html", this.#getHTML());

  #getHTML() {
    const exportedElements = document.querySelectorAll("[data-export]");
    const hostname = getHostNameRegExp("g");

    return Array.from(exportedElements, cleanHTML).map(el =>
      el.outerHTML.replace(hostname, "/")
    );
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
