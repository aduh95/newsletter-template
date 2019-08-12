if (!("requestIdleCallback" in window)) {
  import("./window-requestIdleCallback.js");
}

if (!("text" in Blob.prototype)) {
  import("./blob-text.js");
}

if (!("scrollIntoViewIfNeeded" in Element.prototype)) {
  import("./element-scrollintoviewifneeded.js");
}
