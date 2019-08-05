import { h, Component, createRef } from "preact";
import MarkdownContent from "./MarkdownContent";

const commands = [
  { label: "Bold", char: "**" },
  { label: "Italic", char: "_" },
  {
    label: "Link",
    charBefore: "[",
    charAfter: "](https://)",
    selectionAfter: true,
    selectionOffset: [2, 1],
  },
  { label: "List", charAfter: "\n\n * ", selectionAfter: true },
];

export default class EditMarkdownContent extends Component {
  state = { active: this.props.initialyActive };
  textarea = createRef();

  getCaretPosition(e) {
    if (window.getSelection) {
      const { anchorNode, anchorOffset } = window.getSelection();
      this.focusPosition = {
        text: anchorNode.textContent,
        offset: anchorOffset,
      };
    }
  }

  handleCommand(command) {
    return e => {
      const { current } = this.textarea;

      if (!current) {
        return;
      }

      const { selectionStart, selectionEnd, value } = current;
      const charBefore = command.charBefore || command.char || "";
      const charAfter = command.charAfter || command.char || "";

      current.value =
        value.substring(0, selectionStart) +
        charBefore +
        value.substring(selectionStart, selectionEnd) +
        charAfter +
        value.substring(selectionEnd);

      if (command.selectionAfter) {
        if (command.selectionOffset) {
          const [offsetBefore, offsetAfter] = command.selectionOffset;
          current.setSelectionRange(
            selectionEnd + charBefore.length + offsetBefore,
            selectionEnd + charBefore.length + charAfter.length - offsetAfter
          );
        } else {
          current.setSelectionRange(
            selectionEnd + charAfter.length,
            selectionEnd + charAfter.length
          );
        }
      } else {
        current.setSelectionRange(
          selectionStart + charBefore.length,
          selectionEnd + charBefore.length
        );
      }

      this.props.onChange({ target: current });
      current.focus();
    };
  }

  helper(e) {
    if (e.keyCode === 13) {
      console.log("enter");
      const { value, selectionStart, selectionEnd } = e.target;

      if (/\n(\s+)\*\s.+$/.test(value)) {
        e.target.setRangeText("\n * ", selectionStart, selectionEnd, "end");
        e.preventDefault();
      } else if (/\n(\s+)\*\s*$/.test(value)) {
        e.target.setRangeText("\n", selectionStart - 4, selectionEnd, "end");
      }
    }
  }

  componentDidUpdate() {
    if (this.focusPosition && this.textarea.current) {
      const { current } = this.textarea;
      const pos =
        current.value.lastIndexOf(this.focusPosition.text) +
        this.focusPosition.offset;
      current.setSelectionRange(pos, pos);

      this.focusPosition = null;
    }
  }

  render() {
    return this.state.active ? (
      <fidelset className="markdown-editor">
        <legend>Markdown editor</legend>
        <p>
          <button
            hidden
            type="button"
            onClick={() => this.textarea.current?.focus()}
          />
          [&nbsp;
          {commands.map(command => (
            <button onClick={this.handleCommand(command)} type="button">
              {command.label}
            </button>
          ))}
          &nbsp;]&nbsp;[
          <button onClick={() => this.setState({ active: false })}>
            Back to preview
          </button>
          &nbsp;]
        </p>
        <p>
          <textarea
            {...this.props}
            ref={this.textarea}
            onKeyPress={this.helper.bind(this)}
            rows="10"
            cols="50"
          />
        </p>
      </fidelset>
    ) : (
      <MarkdownContent
        content={this.props.value}
        attributes={{
          contenteditable: "true",
          style: "display:initial",
          onBlur: this.getCaretPosition.bind(this),
          onClick: e => {
            e.stopImmediatePropagation();
            this.setState({ active: true });
          },
        }}
      />
    );
  }
}
