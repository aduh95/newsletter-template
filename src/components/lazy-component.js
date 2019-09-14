import { lazy, h, Fragment } from "../utils/jsx.js";

const ASYNC_COMP = new Map();

function generateComponents({ data }) {
  console.log("render");
  return (
    <>
      {data.map((props, i) => {
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
          return (
            <div data-ignore data-do-not-export>
              Invalid component
            </div>
          );
        }
      })}
    </>
  );
}

generateComponents.prototype = null;
export default generateComponents;
