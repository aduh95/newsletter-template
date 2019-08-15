if (!("requestIdleCallback" in window)) {
  import("./window-requestIdleCallback.js");
}

if (!("arrayBuffer" in Blob.prototype)) {
  import("./blob-arrayBuffer.js");
}

if (!("scrollIntoViewIfNeeded" in Element.prototype)) {
  import("./element-scrollintoviewifneeded.js");
}
