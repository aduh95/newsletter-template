const LEFT_CLICK_BUTTON = 1;
const DOUBLE_CLICK_TIMEOUT = 300;
const lastTouchDate = new WeakMap();

export function touchHandler(e) {
  const [el] = e.composedPath();
  const lastTouchTimestamp = lastTouchDate.get(el) || 0;
  const currentTouchTimestamp = e.timeStamp || Date.now();
  lastTouchDate.set(el, currentTouchTimestamp);

  if (currentTouchTimestamp - lastTouchTimestamp < DOUBLE_CLICK_TIMEOUT) {
    dblClickHandler.call(this, e);
  }
}

/**
 *
 * @param {KeyboardEvent} e
 */
export function keyboardHandler(e) {
  switch (e.key) {
    case "Enter":
      dblClickHandler.call(this, e);
      break;

    case "Delete":
      this.base.remove();
      import("../notify.js")
        .then(module => module.default)
        .then(notify =>
          notify("Article has been removed, use undo to restore it.")
        );
      break;

    default:
      console.log(e.key);
  }
}

/**
 *
 * @param {MouseEvent} e
 */
export function clickHandler(e) {
  if (!this.state.writeMode && !e.ctrlKey && e.which === LEFT_CLICK_BUTTON) {
    e.preventDefault();

    const [el] = e.composedPath();
    if (el.nodeName === "A") {
      el.contentEditable = "true";
      setTimeout(() => {
        try {
          this.base.focus();
        } catch {
          el.blur();
        }

        el.contentEditable = "false";
        if (!this.state.writeMode) {
          import("../notify")
            .then(m => m.default)
            .then(notify => notify("Use Ctrl+Click to open the link"));
        }
      }, DOUBLE_CLICK_TIMEOUT);
    }
  }
}

export function dblClickHandler(e) {
  if (!this.state.writeMode) {
    const focusOffset = [];
    const path = e.composedPath();
    let i = 0;
    while (path[i] && undefined === path[i].dataset?.key) {
      i++;
    }

    e.preventDefault();
    if (window.getSelection) {
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
      focusOffset.push(nodeOffset + anchorOffset, nodeOffset + end);
    }
    this.setState({
      writeMode: true,
      focus: path[i]?.dataset?.key,
      focusOffset,
    });
  }
}
