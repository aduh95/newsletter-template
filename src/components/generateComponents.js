import { h } from "preact";
import { lazy } from "preact/compat";

const ASYNC_COMP = new Map();

export default function generateComponents({ data }) {
  return data.map((props, i) => {
    try {
      const { type } = props;
      if (!ASYNC_COMP.has(type)) {
        console.log("try loading component", type);
        ASYNC_COMP.set(
          type,
          lazy(() =>
            /[^\w]/.test(type)
              ? Promise.reject(new Error("Invalid component name"))
              : import(`./${type}.js`)
          )
        );
      }
      const Component = ASYNC_COMP.get(type);
      return props ? <Component key={i} {...props} /> : null;
    } catch {
      return <div data-ignore>Invalid component</div>;
    }
  });
}
