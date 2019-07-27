import { h, Component, Fragment } from "preact";
import { Suspense, lazy } from "preact/compat";

import Editor from "./Editor.js";
import Loading from "./Loading.js";
import DropZone from "./DropZone.js";

const CONTENT_KEY = "content";

const ASYNC_COMP = new Map();

export default class App extends Component {
  state = { previewing: true, main: null, aside: null };

  componentWillMount() {
    this.importJSONData(localStorage.getItem(CONTENT_KEY));
  }

  importJSONData(data) {
    try {
      const { main, aside } = JSON.parse(data);
      this.setState({ main, aside });
    } catch (e) {
      console.warn(e, data);
    }
  }

  saveState(data) {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(data));
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
      return <Component key={i} {...props} />;
    });
  }

  render() {
    const { main, aside } = this.state;
    console.log("render");
    return (
      <>
        <DropZone dataHandler={txt => this.importJSONData(txt)} />
        <Editor
          title="EcoXpert Newsletter template filling"
          onChange={data => this.saveState(data)}
        >
          <main data-type="main">
            <Suspense fallback={<Loading />}>
              {this.getComponents(main)}
            </Suspense>
          </main>
          <aside data-type="aside">
            <section className="newsletter aside" data-type="aside">
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
