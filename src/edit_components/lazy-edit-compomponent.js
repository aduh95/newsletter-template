import { h, Component, Fragment } from "preact";
import { Suspense, lazy } from "preact/compat";

export default class EditComponent extends Component {
  render() {
    const EditComponent = this.props.active
      ? lazy(() => import(`./${this.props.componentName}.js`))
      : Fragment;

    return (
      <Suspense
        fallback={
          <dialog open data-ignore>
            Loading...
          </dialog>
        }
      >
        <EditComponent {...this.props.props} />
      </Suspense>
    );
  }
}
