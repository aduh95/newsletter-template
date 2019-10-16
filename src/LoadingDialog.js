import { h, createPortal } from "./utils/jsx.js";

function onClick() {
  this.close();
}

function Loading() {
  console.log("render");
  return createPortal(
    <dialog
      data-do-not-export
      open
      data-ignore
      class="loading"
      onClick={onClick}
    >
      Loading...
    </dialog>,
    document.body
  );
}

Loading.prototype = null;
export default Loading;
