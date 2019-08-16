if (!("requestIdleCallback" in window)) {
  import("./window-requestIdleCallback.js");
}

if (!("scrollIntoViewIfNeeded" in Element.prototype)) {
  import("./element-scrollintoviewifneeded.js");
}
