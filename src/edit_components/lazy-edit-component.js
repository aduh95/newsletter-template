import { h, Suspense, lazy } from "../utils/jsx.js";

import LoadingDialog from "../LoadingDialog.js";

const ASYNC_COMP = new Map();

function EditComponent({ active, componentName, props }) {
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

EditComponent.prototype = null;
export default EditComponent;
