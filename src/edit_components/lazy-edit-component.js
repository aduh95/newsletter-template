import { h } from "preact";
import { Suspense, lazy } from "preact/compat";

export default function EditComponent(props) {
  const EditComponent = lazy(() => import(`./${props.componentName}.js`));

  return (
    <Suspense
      fallback={
        <dialog open data-ignore>
          Loading...
        </dialog>
      }
    >
      {props.active ? <EditComponent {...props.props} /> : null}
    </Suspense>
  );
}
