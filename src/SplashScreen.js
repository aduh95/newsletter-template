import { h, Component, Fragment } from "preact";
import statePersistance from "./StatePersistance.js";

import "./SplashScreen.scss";

export default class SplashScreen extends Component {
  handleFile = e => {
    const { target } = e;

    target.setCustomValidity("");

    if (target.files.length) {
      const [file] = target.files;
      file
        .text()
        .then(JSON.parse)
        .then(this.props.dataHandler)
        .catch(e => {
          console.error(e);
          target.setCustomValidity("Invalid file");
          target.form.reportValidity();
        });
    }
  };

  render() {
    console.log("render");
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
            {this.props.previousStateDate ? (
              <>
                <p>
                  <small>or</small>
                  <br></br>
                  <label>
                    <large>
                      <button
                        onClick={() => statePersistance.recoverSaveState()}
                        type="button"
                        autofocus
                      >
                        Continue where you left
                      </button>
                    </large>
                  </label>
                  <br></br>
                  <small>
                    Saved on {this.props.previousStateDate.toLocaleString()}
                  </small>
                </p>
                <details>
                  <summary>Delete recovered version</summary>
                  <p>
                    You can remove the recovered version if you don't need it.
                    <br />
                    Make sure you have backup all the useful data.
                  </p>
                  <button
                    onClick={() => statePersistance.clearRecoverState()}
                    type="button"
                  >
                    Delete saved version
                  </button>
                </details>
              </>
            ) : null}
          </form>
        </main>
      </>
    );
  }
}
