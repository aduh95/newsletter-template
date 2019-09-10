import { h } from "./utils/jsx.js";

function Loading() {
  console.log("render");
  return (
    <dialog data-do-not-export open data-ignore class="loading">
      Loading...
    </dialog>
  );
}

Loading.prototype = null;
export default Loading;
