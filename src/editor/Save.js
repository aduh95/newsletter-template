import { h, Component, Fragment } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faDownload, faFileExport } from "@fortawesome/free-solid-svg-icons";

export default class Save extends Component {
  exportHTML(node) {
    node = node.cloneNode(true);
    Array.from(
      node.querySelectorAll("output[hidden]"),
      HTMLElement.prototype.remove
    );
    ["json", "ignore", "key"].forEach(key =>
      Array.from(node.querySelectorAll(`[data-${key}]`), el =>
        el.dataset.removeDataAttr(key)
      )
    );

    return node.outerHTML;
  }

  exportJSONFile = () =>
    this.#exportFile(
      "editorialCalendar.json",
      JSON.stringify(this.props.editor.data)
    );

  exportHTMLFile = () =>
    this.#exportFile("editorialCalendar.html", this.#getHTML());

  #getHTML() {
    return "TODO";
  }

  #exportFile(fileName, fileContent) {
    const a = document.createElement("a");
    const file = new File([fileContent], fileName, {
      type: "application/json",
    });
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
