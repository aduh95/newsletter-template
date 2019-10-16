import { h } from "preact";
import { memo, createPortal } from "preact/compat";

function onClick(e) {
  e.target.close();
}

export default memo(function Loading() {
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
});
