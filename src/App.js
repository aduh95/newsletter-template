import {
  install as installOfflineApp,
  applyUpdate as updateOfflineApp,
} from "offline-plugin/runtime";

import {
  h,
  Component,
  Fragment,
  Suspense,
  lazy,
  conditionalRendering,
} from "./utils/jsx.js";

import statePersistance from "./app_global_state/templateComponents.js";
import { PERSISTANT_STORAGE_KEY } from "./app_global_state/StatePersistance-const.js";

import Error from "./AppError.js";
import Loading from "./Loading.js";

const APP_TITLE = "Newsletter template builder";

const editingState = Symbol("editing");
const splashScreenState = Symbol("splashScreen");
const errorState = Symbol("error");

const addComponent = (key, component) => {
  const state = statePersistance.get();
  state[key].push(component);
  statePersistance.set(state);
};

const DropZone = lazy(() => import("./DropZone.js"));
const Editor = lazy(() => import("./editor/Editor.js"));
const AddNewComponent = lazy(() => import("./edit_components/AddComponent.js"));
const SplashScreen = lazy(() => import("./SplashScreen.js"));
const GenerateComponents = lazy(() => import("./components/lazy-component.js"));

class OldApp extends Component {
  state = { previewing: true, hasError: false };

  #shouldUpdateDOM = true;
  #idleCallback = null;
  #saveState = this.saveState.bind(this);
  #startTemplateFromScratch = () =>
    statePersistance.set({ main: [], aside: [] });

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.warn(error);
    return { hasError: true };
  }

  constructor() {
    super();
    const currentState = sessionStorage.getItem(PERSISTANT_STORAGE_KEY);
    if (currentState) {
      Object.assign(this.state, JSON.parse(currentState));
      sessionStorage.removeItem(PERSISTANT_STORAGE_KEY);
      import("./app_global_state/History.js").then(m =>
        m.default.recoverSavedState()
      );
    }
  }

  componentWillUnmount() {
    statePersistance.unsubscribe(this.update.bind(this));
  }

  update(data) {
    data = data || {};
    try {
      const main = Array.isArray(data.main) ? data.main : null;
      const aside = Array.isArray(data.aside) ? data.aside : null;

      this.setState({ aside, main });
    } catch (e) {
      console.warn(e, data);
      this.setState({ hasError: true });
    }
  }

  saveState(state, shouldUpdateDOM = true) {
    if (this.#idleCallback) {
      // cancel previous callback as its state is outdated
      cancelIdleCallback(this.#idleCallback);
    }
    // Wait for idle to save state to collapse successive changes
    // into one history entry
    this.#idleCallback = requestIdleCallback(() => {
      this.#idleCallback = null;
      statePersistance.set(state);
      this.#shouldUpdateDOM = shouldUpdateDOM;
    });
  }

  shouldComponentUpdate() {
    if (!this.#shouldUpdateDOM) {
      this.#shouldUpdateDOM = true;
      return false;
    }
  }
}

export default class App extends Component {
  #saveState = Function.prototype;
  #stateObservers = new Set();

  #updateReady = false;

  #addComponentInMain = addComponent.bind(null, "main");
  #addComponentInAside = addComponent.bind(null, "aside");

  #startTemplateFromScratch = () =>
    statePersistance.set({ main: [], aside: [] });

  componentDidMount() {
    console.log("mount");
    statePersistance.subscribe(this.update.bind(this));
    const { currentState } = statePersistance;
    if (currentState) {
      this.update(currentState);
    }

    installOfflineApp({
      onUpdateReady: () => {
        this.#updateReady = true;
      },
      onInstalled: () => {
        import("./notify.js")
          .then(module => module.default)
          .then(notify => notify("Ready to work offline"));
      },
      onUpdated: () => {
        import("./notify.js")
          .then(module => module.default)
          .then(notify => notify("Updated to last version"));
      },
    });
  }

  setState(state) {
    this.#stateObservers.forEach(fn => fn(state).catch(console.err));
  }

  update(data) {
    data = data || {};
    try {
      const main = Array.isArray(data.main) ? data.main : null;
      const aside = Array.isArray(data.aside) ? data.aside : null;

      this.state = { main, aside };

      this.setState(editingState);
    } catch (e) {
      console.warn(e, data);
      this.setState(errorState);
    }
  }

  renderEditor() {
    const { main, aside } = this.state;
    this.state = {};
    console.log({ main, aside });

    if (this.#updateReady) {
      try {
        sessionStorage.setItem(
          PERSISTANT_STORAGE_KEY,
          JSON.stringify({ main, aside })
        );
      } catch {
        console.warn("sessionStorage is not available");
      }
      updateOfflineApp();
    }

    return (
      <Editor title={APP_TITLE} onChange={this.#saveState}>
        <main data-export data-type="main">
          <Suspense fallback={<Loading />}>
            <GenerateComponents data={main} />
          </Suspense>
          <AddNewComponent
            onChange={this.#addComponentInMain}
            components={[
              "Footer",
              "FeatureStories",
              "Hero",
              "HotTopics",
              "NewsletterSection",
              "Separator",
            ]}
          />
        </main>
        <aside data-export data-type="aside" data-contents>
          <section className="newsletter aside" data-type="aside">
            <Suspense fallback={<Loading />}>
              <GenerateComponents data={aside} />
            </Suspense>
            <AddNewComponent
              onChange={this.#addComponentInAside}
              components={["AsideList", "NewsletterArticle", "Separator"]}
            />
          </section>
        </aside>
      </Editor>
    );
  }

  renderSplashScreen() {
    return (
      <SplashScreen
        title={APP_TITLE}
        startTemplateFromScratch={this.#startTemplateFromScratch}
        previousStateDate={statePersistance.lastSavedStateDate}
      />
    );
  }

  renderError() {
    return <Error resetState={() => this.setState({ hasError: false })} />;
  }

  render() {
    console.log("render");

    const currentState = sessionStorage.getItem(PERSISTANT_STORAGE_KEY);
    if (currentState) {
      sessionStorage.removeItem(PERSISTANT_STORAGE_KEY);
      import("./app_global_state/History.js").then(m =>
        m.default.recoverSavedState()
      );
    }

    const defaultState = currentState ? editingState : splashScreenState;
    this.componentDidMount();

    return (
      <>
        <DropZone dataHandler={this.#saveState} />
        {conditionalRendering(
          {
            [errorState]: this.renderError.bind(this),
            [editingState]: this.renderEditor.bind(this),
            [splashScreenState]: this.renderSplashScreen.bind(this),
          },
          this.#stateObservers,
          defaultState,
          e => {
            console.error(e);
            this.setState(errorState);
          }
        )}
        <footer>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/aduh95/newsletter-template-builder"
              >
                View the code
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/aduh95/newsletter-template-builder/issues"
              >
                Report a bug
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/aduh95/newsletter-template-builder/blob/master/README.md#privacy"
              >
                Privacy
              </a>
            </li>
          </ul>

          <div class="text-center">©2019, Schneider Electric</div>
        </footer>
      </>
    );
  }
}
