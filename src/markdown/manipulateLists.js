export const UNORDERED_LIST = Symbol("ul");
export const ORDERED_LIST = Symbol("ol");

const regex = {
  [UNORDERED_LIST]: /^(\s*)([-*]\s)/,
  [ORDERED_LIST]: /^(\s*)(\d+\.\s)/,
};

const MARKDOWN_IDENTIFIER = {
  [UNORDERED_LIST]: "- ",
  [ORDERED_LIST]: "1. ",
};

const anyKindOfListRegex = /^(\s*)(\d+\.|-|\*)\s/;
const NEW_LINE_CHAR = "\n";

function getIndexIfExists(string, haystack, position) {
  const indexOf = string.indexOf(haystack, position);
  return indexOf === -1 ? string.length : indexOf;
}

/**
 * Manipulates markdown content in a textarea to toggle list
 * @param {UNORDERED_LIST|ORDERED_LIST} listType List type
 * @param {HTMLTextAreaElement} textarea Textarea you want to act onto
 */
export function handleListCommand(listType, textarea) {
  const { selectionStart, selectionEnd, value } = textarea;

  const listChar = MARKDOWN_IDENTIFIER[listType];
  const sameListRegex = regex[listType];

  // List are to be handled line by line, let's compute where the selected
  // line(s) actually begin(s) and end(s).
  const beginningOfLineSelection = Math.max(
    0,
    value.lastIndexOf(NEW_LINE_CHAR, selectionStart - 1)
  );
  const endOfLineSelection = getIndexIfExists(
    value,
    NEW_LINE_CHAR,
    selectionEnd
  );

  console.log(
    Array.from(value, c => c.charCodeAt()),
    value.lastIndexOf(NEW_LINE_CHAR, selectionStart - 1),
    endOfLineSelection
  );

  if (selectionStart === selectionEnd) {
    // User doesn't have selected a text range, let's check where the caret is

    // We need to act on the whole line that the user has implicitly selected
    const wholeLine = value.substring(
      beginningOfLineSelection,
      endOfLineSelection
    );

    if (
      selectionEnd === value.length ||
      value.charAt(selectionStart) === NEW_LINE_CHAR
    ) {
      // Caret is at the end of a line

      if (
        selectionStart === 0 ||
        value.charAt(selectionStart - 1) === NEW_LINE_CHAR
      ) {
        // Caret is also at beginning of the line
        // <=> Caret is on a new line
        // Let's assume user wants to begin a list on the same line
        console.log("caret on a new line");
        textarea.setRangeText(
          wholeLine + NEW_LINE_CHAR + listChar,
          beginningOfLineSelection,
          endOfLineSelection,
          "end"
        );
      } else if (anyKindOfListRegex.test(wholeLine)) {
        // Caret is at the end of a line that's already a list
        // User probably wants to create a child list
        console.log("caret at the end of a list-line");
        const [_, currentIndentation] = wholeLine.match(anyKindOfListRegex);
        textarea.setRangeText(
          wholeLine + NEW_LINE_CHAR + currentIndentation + "    " + listChar,
          beginningOfLineSelection,
          endOfLineSelection,
          "end"
        );
      } else {
        // Caret is at the end of a non-list line
        // User probably wants to create a new list after the current line
        // Let's create a new list on a new line
        console.log("caret at the end of a regular line");
        textarea.setRangeText(
          NEW_LINE_CHAR + listChar + wholeLine,
          beginningOfLineSelection,
          endOfLineSelection,
          "end"
        );
      }
    } else {
      // Caret is in the middle of a line
      // Let's act on the whole line
      if (sameListRegex.test(wholeLine)) {
        // Current line is already a list, let's toggle that off
        console.log("caret in the middle of a list-line");
        textarea.setRangeText(
          wholeLine.replace(sameListRegex, ""),
          beginningOfLineSelection,
          endOfLineSelection
        );
      } else if (anyKindOfListRegex.test(wholeLine)) {
        // Current line is a list, but of a different kind
        // Let's convert it
        console.log("caret in the middle of a different kind of list");
        textarea.setRangeText(
          wholeLine.replace(
            anyKindOfListRegex,
            (_, indentation) => indentation + listChar
          ),
          beginningOfLineSelection,
          endOfLineSelection
        );
      } else {
        // Current line is not a list item, let's make it one
        console.log("caret in the middle of a regular line");
        textarea.setRangeText(
          listChar + wholeLine,
          beginningOfLineSelection,
          endOfLineSelection
        );
      }
    }
  } else {
    // User has selected some text
    // In case it's a multiline selection, let's split it
    const selectedLines = value
      .substring(beginningOfLineSelection, endOfLineSelection)
      .split(NEW_LINE_CHAR)
      .filter(String);

    console.log(selectedLines);

    if (selectedLines.every(line => sameListRegex.test(line))) {
      // The current selection already contains a list, so let's remove it
      console.log("selection across a list of same kind");
      textarea.setRangeText(
        selectedLines
          .map(line => line.replace(sameListRegex, ""))
          .join(NEW_LINE_CHAR),
        beginningOfLineSelection,
        endOfLineSelection
      );
    } else if (selectedLines.every(line => anyKindOfListRegex.test(line))) {
      // The current selection already contains a list, but of a different kind
      // Let's replace it with this list
      console.log("selection across a different kind of list");
      textarea.setRangeText(
        selectedLines
          .map(line =>
            line.replace(
              anyKindOfListRegex,
              (_, indentation) => indentation + listChar
            )
          )
          .join(NEW_LINE_CHAR),
        beginningOfLineSelection,
        endOfLineSelection
      );
    } else {
      // The current selection doesn't contain a list, we now have to add it
      console.log("selection across several regular lines");
      textarea.setRangeText(
        selectedLines.map(line => listChar + line).join(NEW_LINE_CHAR),
        beginningOfLineSelection,
        endOfLineSelection
      );
    }
  }
}
