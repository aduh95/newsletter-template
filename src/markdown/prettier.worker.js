import prettier from "prettier/standalone.js";
import mdParser from "prettier/parser-markdown.js";

onmessage = ({ data }) => {
  postMessage(
    prettier.format(data, { parser: "markdown", plugins: [mdParser] })
  );
};
