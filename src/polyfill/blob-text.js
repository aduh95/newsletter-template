Object.defineProperty(Blob.prototype, "text", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function text() {
    return new Response(this).text();
  },
});
