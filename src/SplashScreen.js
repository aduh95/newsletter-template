import { h, Component, Fragment, conditionalRendering } from "./utils/jsx.js";

import NewTemplate from "./edit_components/lazy-edit-component.js";
import { PERSISTANT_STORAGE_NAME } from "./app_global_state/StatePersistance-const.js";

import "./SplashScreen.scss";

const canAccessDatabases = "function" === typeof window.indexedDB?.databases;

export default class SplashScreen extends Component {
  #newTemplateNode = document.createComment("new template");
  #previousSavedDate = null;
  #stateObservers = new Set();

  handleFile = e => {
    const { target } = e;

    target.setCustomValidity("");

    if (target.files.length) {
      const [file] = target.files;
      import("./app_global_state/initiateState.js")
        .then(module => module.default.initiateWithFile(file))
        .catch(e => {
          console.error(e);
          target.setCustomValidity("Invalid file");
          target.form.reportValidity();
        });
    }
  };

  #startTemplate = () => {
    if (this.#previousSavedDate) {
      return import("./app_global_state/History.js")
        .then(module => module.default.recoverSavedState())
        .catch(e =>
          import("./notify.js").then(m =>
            m.default("Operation failed", console.error(e))
          )
        );
    } else {
      const newTemplateNode = (
        <NewTemplate
          componentName="TemplateSettings"
          active={true}
          props={{
            recoverSavedState: this.#startTemplate,
            saveChange: this.props.startTemplateFromScratch,
            resetState: this.#closeNewTemplateModal,
          }}
        />
      );
      newTemplateNode.then(element => {
        this.#newTemplateNode.replaceWith(element);
        this.#newTemplateNode = element;
      });
    }
  };
  #closeNewTemplateModal = () => {
    const element = document.createComment("new template");
    this.#newTemplateNode.replaceWith(element);
    this.#newTemplateNode = element;
  };
  #clearSavedTemplate = () => {
    return import("./app_global_state/History.js")
      .then(module => module.default.clearSavedState())
      .then(
        () => {
          this.#previousSavedDate = null;
          this.#stateObservers.forEach(fn => fn(false));
        },
        e =>
          import("./notify.js").then(m =>
            m.default("Operation failed", console.error(e))
          )
      );
  };

  checkSavedState() {
    const doesDatabaseExist = canAccessDatabases
      ? indexedDB
          .databases()
          .then(databases =>
            databases.find(({ name }) => name === PERSISTANT_STORAGE_NAME)
          )
      : Promise.resolve(true); // let's assume it exists

    return doesDatabaseExist.then(result =>
      result
        ? import("./app_global_state/History.js")
            .then(module => module.default)
            .then(appStateHistory => appStateHistory.getLastSavedDate())
        : Promise.resolve(false)
    );
  }

  render() {
    console.log("render");
    this.checkSavedState()
      .then(d => {
        this.#previousSavedDate = d;
        this.#stateObservers.forEach(fn => fn(Boolean(d)));
      })
      .catch(console.error);

    return (
      <>
        <header>
          <h1>{this.props.title}</h1>
        </header>
        <main className="splash">
          <form onSubmit={e => e.preventDefault()}>
            <p>
              <small>To get started,</small>
              <br></br>
              <strong>Drag and Drop</strong> a file here
              <br></br>
              <small>or</small>
              <br></br>
              <label>
                <strong>Select a file</strong>&nbsp;
                <input
                  type="file"
                  accept="application/json"
                  onChange={this.handleFile}
                />
              </label>
            </p>
            <p>
              <small>or</small>
              <br></br>
              <label>
                <large>
                  <button onClick={this.#startTemplate} type="button" autofocus>
                    {conditionalRendering(
                      {
                        [true]: "Continue where you left",
                        [false]: "Start an empty template",
                      },
                      this.#stateObservers,
                      false
                    )}
                  </button>
                </large>
              </label>
              <br></br>

              <small>
                <em>
                  {conditionalRendering(
                    {
                      [true]: () => (
                        <>
                          Saved on{" "}
                          <time
                            dateTime={this.#previousSavedDate.toISOString()}
                          >
                            {this.#previousSavedDate.toLocaleString()}
                          </time>
                        </>
                      ),
                      [false]: "No recoverable version found",
                      default: "Checking if previous version exists...",
                    },
                    this.#stateObservers,
                    "default"
                  )}
                </em>
              </small>
            </p>
            {conditionalRendering(
              {
                [true]: (
                  <details>
                    <summary>
                      Erase recovered version to start a new template
                    </summary>
                    <p>
                      You can remove the recovered version and start a new
                      template from scratch.
                      <br />
                      Make sure you have backup all the useful data.
                    </p>
                    <button onClick={this.#clearSavedTemplate} type="button">
                      Delete saved version
                    </button>
                  </details>
                ),
              },
              this.#stateObservers
            )}
          </form>
          {this.#newTemplateNode}
        </main>
      </>
    );
  }
}
