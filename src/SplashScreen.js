import { h, Component, Fragment } from "preact";

import "./SplashScreen.scss";

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
    import("./notify.js").then(m => m.default("Not implemented"));
    this.forceUpdate();
  };
  #clearSavedTemplate = () => {
    import("./notify.js").then(m => m.default("Not implemented"));
    this.forceUpdate();
  };

  componentDidMount() {
    const databases =
      "function" === typeof window.indexedDB?.databases
        ? indexedDB.databases()
        : Promise.resolve([null]);

    databases
      .then(({ length }) =>
        length
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
              {loading ? (
                <small>
                  <em>Checking if previous version exists</em>
                </small>
              ) : previousStateDate ? (
                <small>Saved on {previousStateDate.toLocaleString()}</small>
              ) : null}
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
        </main>
      </>
    );
  }
}
