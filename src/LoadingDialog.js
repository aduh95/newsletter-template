import { h } from "preact";
import { memo } from "preact/compat";

export default memo(function Loading() {
  console.log("render");
  return (
    <dialog data-do-not-export open data-ignore class="loading">
      Loading...
    </dialog>
  );
});
