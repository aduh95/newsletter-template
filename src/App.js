import { h, Component, Fragment } from "preact";
import { Suspense, lazy } from "preact/compat";

import statePersistance from "./StatePersistance.js";

import Error from "./AppError.js";
import Loading from "./Loading.js";

const APP_TITLE = "Newsletter template builder";

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
      this.setState({ hasError: true });
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

    const DropZone = lazy(() => import("./DropZone.js"));

    const appReadyForEditor = main && aside;
    const Editor = appReadyForEditor
      ? lazy(() => import("./editor/Editor.js"))
      : null;
    const SplashScreen = appReadyForEditor
      ? null
      : lazy(() => import("./SplashScreen.js"));

    return this.state.hasError ? (
      <Error resetState={() => this.setState({ hasError: false })} />
    ) : (
      <>
        <Suspense fallback={<Loading />}>
          <DropZone dataHandler={txt => this.saveState(txt)} />
          {appReadyForEditor ? (
            <Editor title={APP_TITLE} onChange={this.saveState.bind(this)}>
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
              title={APP_TITLE}
              dataHandler={txt => this.saveState(txt)}
              previousStateDate={statePersistance.lastSavedStateDate}
            />
          )}
        </Suspense>
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
