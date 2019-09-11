import { h, Component, createRef, createPortal } from "../utils/jsx.js";

import registerDialogElement from "../polyfill/htmldialogelement.js";

const doNotPropagateEvent = event => event.stopPropagation();

export default class Modal extends Component {
  dialog = createRef();

  update() {
    const { current } = this.dialog;

    registerDialogElement(current).then(
      () => current && !current.open && current.showModal()
    );
  }

  render() {
    console.log("render");
    return createPortal(
      <dialog
        data-do-not-export
        data-ignore
        onClose={this.props.onClose}
        onClick={doNotPropagateEvent}
        ref={this.dialog}
      >
        {this.props.children}
      </dialog>,
      document.body,
      () => this.update()
    );
  }
}
