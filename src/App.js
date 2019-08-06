import { h, Component, Fragment } from "preact";
import { Suspense, lazy } from "preact/compat";

import statePersistance from "./StatePersistance.js";

import Error from "./Error.js";
import Editor from "./Editor.js";
import Loading from "./Loading.js";
import DropZone from "./DropZone.js";
import SplashScreen from "./SplashScreen.js";

const ASYNC_COMP = new Map();

export default class App extends Component {
  state = { previewing: true, hasError: false };
  #shouldUpdateDOM = true;

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.warn(error);
    return { hasError: true };
  }

  componentWillMount() {
    statePersistance.subscribe(this.update.bind(this));
    const { currentState } = statePersistance;
    if (currentState) {
      this.update(currentState);
    }
  }

  componentWillUnmount() {
    statePersistance.unsubscribe(this.update.bind(this));
  }

  update(data) {
    try {
      let { main, aside } = data;
      if (!Array.isArray(main)) {
        main = undefined;
      }
      if (!Array.isArray(aside)) {
        aside = undefined;
      }
      console.log("import", { main, aside });
      this.setState({ main, aside });
    } catch (e) {
      console.warn(e, data);
    }
  }

  saveState(data, shouldUpdateDOM = true) {
    statePersistance.currentState = data;
    this.#shouldUpdateDOM = shouldUpdateDOM;
  }

  shouldComponentUpdate() {
    if (!this.#shouldUpdateDOM) {
      this.#shouldUpdateDOM = true;
      return false;
    }
  }

  getComponents(array) {
    return array.map((props, i) => {
      try {
        const { type } = props;
        if (!ASYNC_COMP.has(type)) {
          console.log("try loading component", type);
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
        return props ? <Component key={i} {...props} /> : null;
      } catch {
        return <div data-ignore>Invalid component</div>;
      }
    });
  }

  render() {
    const { main, aside } = this.state;
    console.log("render");
    return this.state.hasError ? (
      <Error
        resetState={() => {
          localStorage.removeItem(CONTENT_KEY);
          this.setState({ main: [], aside: [], hasError: false });
        }}
      />
    ) : (
      <>
        <DropZone dataHandler={txt => this.importJSONData(txt)} />
        {main && aside ? (
          <Editor
            title="EcoXpert Newsletter template filling"
            onChange={this.saveState.bind(this)}
          >
            <main data-type="main">
              <Suspense fallback={<Loading />}>
                {main ? (
                  this.getComponents(main)
                ) : (
                  <p data-ignore>
                    <em>Empty</em>
                  </p>
                )}
              </Suspense>
            </main>
            <aside data-type="aside" data-contents>
              <section className="newsletter aside" data-type="aside">
                <Suspense fallback={<Loading />}>
                  {aside ? (
                    this.getComponents(aside)
                  ) : (
                    <p data-ignore>
                      <em>Empty</em>
                    </p>
                  )}
                </Suspense>
              </section>
            </aside>
          </Editor>
        ) : (
          <SplashScreen
            title="Welcome"
            previousStateDate={statePersistance.lastSavedStateDate}
          />
        )}
        <footer>
          <ul>
            <li>
              <a href="https://github.com/aduh95/newsletter-template">
                View the code
              </a>
            </li>
            <li>
              <a href="https://github.com/aduh95/newsletter-template/issues">
                Report a bug
              </a>
            </li>
          </ul>
        </footer>
      </>
    );
  }
}
