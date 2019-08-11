import { getHostName, getHostNameRegExp } from "../currentStateHostName.js";

const malformedURL = /\/search#documentUUID\/([a-f0-9\-]+)\/(.+)$/;

export default function normalizeURL(inputValue) {
  if (malformedURL.test(inputValue) && getHostNameRegExp().test(inputValue)) {
    const [str, uuid, name] = malformedURL.exec(inputValue);
    const url = new URL("/search", getHostName());
    url.searchParams.set("documentUUID", uuid);
    url.searchParams.set("title", name);

    return url.toString();
  } else {
    try {
      inputValue = new URL(inputValue).toString();
    } catch {}
    return inputValue;
  }
}
