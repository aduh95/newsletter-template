import marked from "marked";

const renderer = new marked.Renderer();

renderer.link = (href, title, text) =>
  `<a tabindex="-1" href="${new URL(href)}" target="_blank" rel="noopener"${
    title ? ` title="${title.replace('"', "&quot;")}"` : ""
  }>${text}</a>`;

onmessage = ({ data }) => {
  postMessage(marked(data, { headerIds: false, renderer }));
};
