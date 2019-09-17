import StatefulComponentVendor from "@aduh95/async-jsx/dist/react/StatefulComponent.js";

export class StatefulComponent extends StatefulComponentVendor {
  _render() {
    const domElement = super._render(...arguments);
    domElement.dataset.contents = true;

    return domElement;
  }
}
