import { h, Component, Fragment } from "preact";
import { Suspense, lazy } from "preact/compat";

import Editor from "./Editor.js";
import Loading from "./Loading.js";
import DropZone from "./DropZone.js";

const CONTENT_KEY = "content";
const CONTENT_CACHE = {};

const ASYNC_COMP = new Map();

export default class App extends Component {
  state = { previewing: true, main: null, aside: null };

  componentWillMount() {
    const savedContent = localStorage.getItem(CONTENT_KEY);

    try {
      this.deserialize(savedContent);
    } catch (e) {
      console.warn(e);
    }
  }

  importData(data) {
    try {
      this.serialize(this.deserialize(data));
    } catch (e) {
      console.warn(e, data);
    }
  }

  serialize(array = null, i = null, data = null) {
    if (Array.isArray(array) && Number.isInteger(i)) {
      array[i] = data;
    }
    localStorage.setItem(CONTENT_KEY, JSON.stringify(CONTENT_CACHE));
  }

  getComponents(array) {
    return array.map((props, i, array) => {
      const { type } = props;
      if (!ASYNC_COMP.has(type)) {
        ASYNC_COMP.set(
          type,
          lazy(() =>
            /[^\w]/.test(type)
              ? Promise.reject(new Error("Invalid component name"))
              : import(`./components/${type}.js`)
          )
        );
      }
      const Component = ASYNC_COMP.get(type);
      return (
        <Component
          key={i}
          {...props}
          onChange={data => this.serialize(array, i, data)}
        />
      );
    });
  }

  deserialize(data) {
    const { main, aside } = JSON.parse(data);
    CONTENT_CACHE.main = main;
    CONTENT_CACHE.aside = aside;
    this.setState({ main, aside });
  }

  render() {
    const { main, aside } = this.state;
    console.log("render");
    return (
      <>
        <DropZone dataHandler={txt => this.importData(txt)} />
        <Editor title="EcoXpert Newsletter template filling">
          <main data-name="main">
            <Suspense fallback={<Loading />}>
              {this.getComponents(main)}
            </Suspense>
          </main>
          <aside data-name="aside">
            <section className="newsletter aside" data-name="aside">
              <Suspense fallback={<Loading />}>
                {this.getComponents(aside)}
              </Suspense>
            </section>
          </aside>
        </Editor>
      </>
    );
  }
}
