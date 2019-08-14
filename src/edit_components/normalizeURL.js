import templateHostname from "../app_global_state/templateHostName.js";

const malformedURL = /\/search#documentUUID\/([a-f0-9\-]+)\/(.+)$/;

export default function normalizeURL(inputValue) {
  if (
    malformedURL.test(inputValue) &&
    templateHostname.getHostNameRegExp().test(inputValue)
  ) {
    const [str, uuid, name] = malformedURL.exec(inputValue);
    const url = new URL("/search", templateHostname.get());
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
