import {
  install as installOfflineApp,
  applyUpdate as updateOfflineApp,
} from "offline-plugin/runtime";

import { h, Component, Fragment } from "preact";
import { Suspense, lazy } from "preact/compat";

import statePersistance from "./app_global_state/templateComponents.js";
import { PERSISTANT_STORAGE_KEY } from "./app_global_state/StatePersistance-const.js";

import Error from "./AppError.js";
import Loading from "./Loading.js";

const APP_TITLE = "Newsletter template builder";

const addComponent = (key, component) => {
  const state = statePersistance.get();
  state[key].push(component);
  statePersistance.set(state);
};

import DropZone from "./DropZone.js";
import Editor from "./editor/Editor.js";
import AddNewComponent from "./edit_components/AddComponent.js";
import SplashScreen from "./SplashScreen.js";
import GenerateComponents from "./components/lazy-component.js";

export default class App extends Component {
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
    try {
      const currentState = sessionStorage.getItem(PERSISTANT_STORAGE_KEY);
      if (currentState) {
        Object.assign(this.state, JSON.parse(currentState));
        sessionStorage.removeItem(PERSISTANT_STORAGE_KEY);
        import("./app_global_state/History.js").then(m =>
          m.default.recoverSavedState()
        );
      }
    } catch {
      console.log("sessionStorage is not available");
    }
  }

  componentDidMount() {
    console.log("mount");
    statePersistance.subscribe(this.update.bind(this));
    const { currentState } = statePersistance;
    if (currentState) {
      this.update(currentState);
    }

    installOfflineApp({
      onUpdateReady: () => {
        this.updateReady = true;
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

  componentWillUnmount() {
    statePersistance.unsubscribe(this.update.bind(this));
  }

  update(data) {
    data = data || {};
    try {
      const main = Array.isArray(data.main) ? data.main : null;
      const aside = Array.isArray(data.aside) ? data.aside : null;

      this.setState({ aside, main }, () => {
        (main && aside) || document.querySelector("input").focus();
      });
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

  #addComponentInMain = addComponent.bind(null, "main");
  #addComponentInAside = addComponent.bind(null, "aside");

  render() {
    console.log("render", this.state);
    const { main, aside } = this.state;
    const appReadyForEditor = main && aside;

    if (this.updateReady) {
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
      <>
        {this.state.hasError ? (
          <Error resetState={() => this.setState({ hasError: false })} />
        ) : (
          <Suspense fallback={<Loading />}>
            <DropZone dataHandler={this.#saveState} />
            {appReadyForEditor ? (
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
                      components={[
                        "AsideList",
                        "NewsletterArticle",
                        "Separator",
                      ]}
                    />
                  </section>
                </aside>
              </Editor>
            ) : window.self === window.top ? (
              <SplashScreen
                title={APP_TITLE}
                startTemplateFromScratch={this.#startTemplateFromScratch}
                previousStateDate={statePersistance.lastSavedStateDate}
              />
            ) : (
              <p>Loaded from iframe; use API to operate.</p>
            )}
          </Suspense>
        )}
        <footer>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/aduh95/newsletter-template-builder"
                tabIndex={9}
              >
                View the code
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/aduh95/newsletter-template-builder/issues"
                tabIndex={9}
              >
                Report a bug
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/aduh95/newsletter-template-builder/blob/master/README.md#privacy"
                tabIndex={9}
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
