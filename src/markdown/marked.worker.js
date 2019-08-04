import marked from "marked";

onmessage = ({ data }) => {
  postMessage(marked(data));
};
