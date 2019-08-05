import { h, Component, createRef } from "preact";
import MarkdownContent from "./MarkdownContent";

const commands = [
  { label: "Bold", char: "**", shortcut: "b" },
  { label: "Italic", char: "_", shortcut: "i" },
  {
    label: "Link",
    charBefore: "[",
    charAfter: "](https://)",
    selectionAfter: true,
    selectionOffset: [2, 1],
    shortcut: "k",
  },
  { label: "List", charAfter: "\n\n * ", selectionAfter: true },
];

const ul_patern = /\n(\s+)\*\s.+$/;
const ul_end_patern = /\n(\s+)\*\s*$/;

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
    const { value, selectionStart, selectionEnd } = e.target;
    if (e.keyCode === 13) {
      // Enter
      if (ul_patern.test(value)) {
        e.target.setRangeText("\n * ", selectionStart, selectionEnd, "end");
        e.preventDefault();
      } else if (ul_end_patern.test(value)) {
        e.target.setRangeText("\n", selectionStart - 4, selectionEnd, "end");
      }
    } else if (e.keyCode === 9) {
      // Tabulation
      e.preventDefault();
      if (ul_end_patern.test(value)) {
        // const [_,spaces] = value.match(ul_end_patern)
        e.target.setRangeText("  * ", selectionStart - 2, selectionEnd, "end");
      } else {
        e.target.setRangeText(" > ", selectionStart, selectionEnd, "end");
      }
    } else console.log(e.keyCode);
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
            <button
              onClick={this.handleCommand(command)}
              accesskey={command.shortcut}
              type="button"
            >
              {command.label}
            </button>
          ))}
          &nbsp;]&nbsp;[
          <button
            accesskey="s"
            onClick={() => this.setState({ active: false })}
          >
            Back to preview
          </button>
          &nbsp;]
        </p>
        <p>
          <textarea
            {...this.props}
            ref={this.textarea}
            onKeyDown={this.helper.bind(this)}
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
