import { renderAsync } from "./renderAsync.js";
const EVENT_PROP = /^on[A-Z]/;

/**
 * @callback importComponentAsync
 * @returns {Promise<{default:string|Promise<Element>|loadElementAsync}>}
 */

/**
 * @callback loadElementAsync
 * @param {Object} props
 * @param  {...Promise<Element>} children
 * @return {Promise<Element>}
 */

/**
 * @param {importComponentAsync} importCallback
 * @return {loadElementAsync}
 */
export const lazy = importCallback => (props, ...children) =>
  importCallback()
    .then(module => module.default)
    .then(El => <El {...props}>{children}</El>);

const refMap = new WeakMap();
export function createRef() {
  return {
    get current() {
      return refMap.get(this);
    },
  };
}

export const Fragment = () => document.createDocumentFragment();

export class Component {
  constructor(props, children) {
    this.props = { children, ...props };
  }
}

export class Suspense extends Component {
  async render() {
    const subElements = this.props.children.splice(0);
    return renderAsync(
      Promise.all(subElements).then(children => {
        const frag = document.createDocumentFragment();
        frag.append(...children.filter(Boolean));
        return frag;
      }),
      await this.props.fallback
    );
  }
}

/**
 * @param {string|Promise<Element>|loadElementAsync|Component} element
 * @param {Object} props
 * @param  {...Promise<Element>} children
 * @return {Promise<Element>}
 */
export async function h(element, props = null, ...children) {
  switch (typeof element) {
    case "function":
      if (element.prototype?.constructor === element) {
        const component = new element(props, children);
        element = await component.render();
      } else {
        element = await element(props, children);
      }
      break;

    case "string":
      element = document.createElement(element);

      if (props) {
        if (props.ref) {
          refMap.set(props.ref, element);
          props.ref = undefined;
        }
        Object.entries(props)
          .filter(([name, value]) => value !== undefined)
          .forEach(([name, value]) =>
            EVENT_PROP.test(name)
              ? (element[name.toLowerCase()] = value)
              : name in element
              ? (element[name] = value)
              : element.setAttribute(name, value)
          );
      }
      break;

    default:
      element = "render" in element ? await element.render() : await element;
  }

  if (children.length && element.append) {
    const subElements = await Promise.all(children.flat(Infinity));
    element.append(...subElements.filter(Boolean));
  }
  return element;
}
