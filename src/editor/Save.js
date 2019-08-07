import { h, Component, Fragment } from "preact";

if (!("requestIdleCallback" in window)) {
  import("./polyfill/window-requestIdleCallback.js");
}

class MultiChoiceMenu extends Component {
  render() {
    return (
      <form>
        <p>{this.props.childen.map(child => child)}</p>
      </form>
    );
  }
}

class Option extends Component {
  render() {
    return (
      <label>
        <input type="radio" name={this.props.name} />
        {this.props.label}
      </label>
    );
  }
}

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

  clickHandler() {
    const fileName = "editorialCalendar.json";
    const a = document.createElement("a");
    const file = new File([JSON.stringify(this.props.editor.data)], fileName, {
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
    return <button onClick={() => this.clickHandler()}>Download JSON</button>;
  }
}
