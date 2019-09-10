import { h, Component, Fragment } from "./utils/jsx.js";

import NewTemplate from "./edit_components/lazy-edit-component.js";
import { PERSISTANT_STORAGE_NAME } from "./app_global_state/StatePersistance-const.js";

import "./SplashScreen.scss";

const canAccessDatabases = "function" === typeof window.indexedDB?.databases;

export default class SplashScreen extends Component {
  state = { loading: true };
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
    if (this.state.previousStateDate) {
      return import("./app_global_state/History.js")
        .then(module => module.default.recoverSavedState())
        .catch(e =>
          import("./notify.js").then(m =>
            m.default("Operation failed", console.error(e))
          )
        );
    } else {
      this.setState({ createNewTemplate: true });
    }
  };
  #closeNewTemplateModal = () => {
    this.setState({ createNewTemplate: false });
  };
  #clearSavedTemplate = () => {
    return import("./app_global_state/History.js")
      .then(module => module.default.clearSavedState())
      .then(
        () => this.setState({ previousStateDate: null }),
        e =>
          import("./notify.js").then(m =>
            m.default("Operation failed", console.error(e))
          )
      );
  };

  componentDidMount() {
    const doesDatabaseExist = canAccessDatabases
      ? indexedDB
          .databases()
          .then(databases =>
            databases.find(({ name }) => name === PERSISTANT_STORAGE_NAME)
          )
      : Promise.resolve(true); // let's assume it exists

    doesDatabaseExist
      .then(result =>
        result
          ? import("./app_global_state/History.js")
          : Promise.reject("No saved state")
      )
      .then(module => module.default)
      .then(appStateHistory => appStateHistory.getLastSavedDate())
      .then(previousStateDate =>
        this.setState({ previousStateDate, loading: false })
      )
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    console.log("render");
    const { previousStateDate, loading } = this.state;
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
                    {previousStateDate
                      ? "Continue where you left"
                      : "Start an empty template"}
                  </button>
                </large>
              </label>
              <br></br>

              <small>
                <em>
                  {loading
                    ? "Checking if previous version exists..."
                    : previousStateDate
                    ? `Saved on ${previousStateDate.toLocaleString()}`
                    : "No recoverable version found"}
                </em>
              </small>
            </p>
            {previousStateDate ? (
              <details>
                <summary>
                  Erase recovered version to start a new template
                </summary>
                <p>
                  You can remove the recovered version and start a new template
                  from scratch.
                  <br />
                  Make sure you have backup all the useful data.
                </p>
                <button onClick={this.#clearSavedTemplate} type="button">
                  Delete saved version
                </button>
              </details>
            ) : null}
          </form>
          <NewTemplate
            componentName="TemplateSettings"
            active={this.state.createNewTemplate}
            props={{
              previousStateDate: previousStateDate,
              recoverSavedState: this.#startTemplate,
              saveChange: this.props.startTemplateFromScratch,
              resetState: this.#closeNewTemplateModal,
            }}
          />
        </main>
      </>
    );
  }
}
