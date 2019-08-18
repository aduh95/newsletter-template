import { h } from "preact";
import { Suspense, lazy } from "preact/compat";
import LoadingDialog from "../LoadingDialog";

const ASYNC_COMP = new Map();

export default function EditComponent({ active, componentName, props }) {
  if (!ASYNC_COMP.has(componentName)) {
    console.log("try loading edit_component", componentName);
    ASYNC_COMP.set(componentName, lazy(() => import(`./${componentName}.js`)));
  }

  const EditComponent = ASYNC_COMP.get(componentName);

  console.log("render", "Edit" + componentName, active);
  return (
    <Suspense fallback={<LoadingDialog />}>
      {active ? <EditComponent {...props} /> : null}
    </Suspense>
  );
}
