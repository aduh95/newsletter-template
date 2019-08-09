import { h, Component } from "preact";
import Edit from "../edit_components/lazy-edit-component.js";
import MarkdownContent from "../markdown/MarkdownContent.js";

export default class Footer extends Component {
  state = { writeMode: false };

  clickHandler(e) {
    if (!this.state.writeMode && !e.ctrlKey) {
      e.preventDefault();

      const [el] = e.composedPath();

      el.contentEditable = "true";
      setTimeout(() => {
        el.contentEditable = "false";
      }, 300);
    }
  }

  dblClickHandler(e) {
    if (!this.state.writeMode) {
      const focusPosition = [];
      const path = e.composedPath();
      let i = 0;
      while (path[i] && undefined === path[i].dataset?.key) {
        i++;
      }

      e.preventDefault();
      if (path[i] && window.getSelection) {
        let nodeOffset = 0;
        const selection = getSelection();
        const { anchorOffset, focusOffset: end } = selection;
        if (i > 0) {
          let node = path[0];
          do {
            const { previousSibling } = node;
            nodeOffset += previousSibling?.textContent?.length || 0;
            node = previousSibling || node.parentNode;
          } while (node && node !== path[i]);
          this.setState({ focusText: selection.toString() });
        }
        Object.assign(focusPosition, {
          start: nodeOffset + anchorOffset,
          end: nodeOffset + end,
          text: selection.toString(),
        });
      }
      this.setState({
        writeMode: true,
        focusPosition,
      });
    }
  }

  update({ text }) {
    this.setState({ writeMode: false });
    Object.assign(this.props, { text });
  }

  render() {
    return (
      <section
        className="newsletter-footer"
        data-type="Footer"
        onClick={this.clickHandler.bind(this)}
        onDblclick={this.dblClickHandler.bind(this)}
      >
        <output hidden data-key="text">
          {this.props.text}
        </output>
        <MarkdownContent
          content={this.props.text}
          attributes={{
            ["data-key"]: true,
            ["data-ignore"]: true,
          }}
        />

        <Edit
          componentName="Footer"
          active={this.state.writeMode}
          props={{
            ...this.props,
            focusPosition: this.state.focusPosition,
            saveState: this.update.bind(this),
            resetState: () => this.setState({ writeMode: false }),
          }}
        />
      </section>
    );
  }
}
