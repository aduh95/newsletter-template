Object.defineProperty(Blob.prototype, "arrayBuffer", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function arrayBuffer() {
    return new Response(this).arrayBuffer();
  },
});
