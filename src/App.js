import {
  install as installOfflineApp,
  applyUpdate as updateOfflineApp,
} from "offline-plugin/runtime";

import { h, Component, Fragment } from "preact";
import { Suspense, lazy, createPortal } from "preact/compat";

import statePersistance from "./StatePersistance.js";

import Error from "./AppError.js";
import Loading from "./Loading.js";

const APP_TITLE = "Newsletter template builder";

const DropZone = lazy(() => import("./DropZone.js"));
const Editor = lazy(() => import("./editor/Editor.js"));
const AddNewComponent = lazy(() => import("./edit_components/AddComponent.js"));
const SplashScreen = lazy(() => import("./SplashScreen.js"));
const GenerateComponents = lazy(() => import("./components/lazy-component.js"));

export default class App extends Component {
  state = { previewing: true, hasError: false };

  #shouldUpdateDOM = true;
  #idleCallback = null;
  #saveState = this.saveState.bind(this);

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.warn(error);
    return { hasError: true };
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
    try {
      const main = Array.isArray(data.main) ? data.main : null;
      const aside = Array.isArray(data.aside) ? data.aside : null;
      const customCSS = data.css ? (
        <style data-export data-type="css">
          {data.css}
        </style>
      ) : null;
      this.setState({ aside, main, customCSS });
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
      statePersistance.currentState = state;
      this.#shouldUpdateDOM = shouldUpdateDOM;
    });
  }

  shouldComponentUpdate() {
    if (!this.#shouldUpdateDOM) {
      this.#shouldUpdateDOM = true;
      return false;
    }
  }

  render() {
    console.log("render", this.state);
    if (this.updateReady) {
      updateOfflineApp();
    }

    const { main, aside, customCSS } = this.state;
    const appReadyForEditor = main && aside;

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
                      components={[
                        "AsideList",
                        "NewsletterArticle",
                        "Separator",
                      ]}
                    />
                  </section>
                </aside>
                {createPortal(customCSS, document.head)}
              </Editor>
            ) : (
              <SplashScreen
                title={APP_TITLE}
                dataHandler={this.#saveState}
                previousStateDate={statePersistance.lastSavedStateDate}
              />
            )}
          </Suspense>
        )}
        <footer>
          <ul>
            <li>
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/aduh95/newsletter-template"
              >
                View the code
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener"
                href="https://github.com/aduh95/newsletter-template/issues"
              >
                Report a bug
              </a>
            </li>
          </ul>
        </footer>
      </>
    );
  }
}
