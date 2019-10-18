/**
 *
 * @param {HTMLElement} node
 */
const cleanHTML = node => {
  if (
    "function" === typeof node.hasAttribute &&
    node.hasAttribute("data-contents")
  ) {
    return Array.from(node.childNodes, cleanHTML);
  } else if (
    node.nodeName === "OUTPUT" ||
    ("function" === typeof node.hasAttribute &&
      node.hasAttribute("data-do-not-export"))
  ) {
    return [];
  }

  const clone = node.cloneNode(false);
  if (node.attributes) {
    for (const { name } of node.attributes) {
      if (name.startsWith("data-")) {
        clone.removeAttribute(name);
      }
    }
    clone.removeAttribute("contenteditable");
  }
  Array.from(node.childNodes)
    .flatMap(cleanHTML)
    .forEach(el => clone.appendChild(el));
  if (node instanceof HTMLImageElement) {
    clone.setAttribute("height", node.naturalHeight);
    clone.setAttribute("width", node.naturalWidth);
  }

  return clone;
};

export default function getExportableElements() {
  const exportedElements = document.querySelectorAll("[data-export]");

  return Array.from(exportedElements).flatMap(cleanHTML);
}

export async function getExportableHTML() {
  const templateHostName = await import(
    "../app_global_state/templateHostName.js"
  ).then(module => module.default);

  const hostname = await templateHostName.getHostNameRegExp("g");
  return getExportableElements().map(el => el.outerHTML.replace(hostname, "/"));
}
