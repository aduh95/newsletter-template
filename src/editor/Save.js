import { h, Fragment } from "preact";
import { PureComponent } from "preact/compat";

import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faDownload, faFileExport } from "@fortawesome/free-solid-svg-icons";

import { getExportableHTML } from "../getExportableElements.js";

const getTemplateName = () =>
  import("../app_global_state/templateName.js")
    .then(module => module.default)
    .then(templateName => templateName.get());

const getCurrentState = () =>
  import("../app_global_state/History.js")
    .then(module => module.default)
    .then(history => history.getCurrentStateAsArrayBuffer());

export default class Save extends PureComponent {
  exportJSONFile() {
    return Promise.all([getTemplateName(), getCurrentState()]).then(
      ([name, fileContent]) =>
        this.#exportFile(name + ".json", "application/json", fileContent)
    );
  }

  exportHTMLFile() {
    return Promise.all([getTemplateName(), getExportableHTML()]).then(
      ([name, html]) => this.#exportFile(name + ".html", "text/html", html)
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
