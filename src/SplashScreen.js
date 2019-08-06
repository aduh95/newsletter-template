import { h, Component, Fragment } from "preact";
import statePersistance from "./StatePersistance.js";

export default class SplashScreen extends Component {
  handleFile(e) {
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
  }

  render() {
    return (
      <>
        <header>
          <h1>{this.props.title}</h1>
        </header>
        <main className="splash">
          <p>
            <strong>Drag and drop</strong> a file here
          </p>
          <form onSubmit={e => e.preventDefault()}>
            <label>
              <strong>Select a file</strong>&nbsp;
              <input
                type="file"
                accept="application/json"
                onChange={this.handleFile.bind(this)}
              />
            </label>
          </form>
          {this.props.previousStateDate ? (
            <>
              <p>
                Or continue where you left:&nbsp;
                <button
                  onClick={() => statePersistance.recoverSaveState()}
                  autofocus
                >
                  Recover last version
                </button>
                &nbsp;
                <small>
                  Saved on {this.props.previousStateDate.toLocaleString()}
                </small>
              </p>
              <p>
                <button onClick={() => statePersistance.clearRecoverState()}>
                  Delete saved version
                </button>
              </p>
            </>
          ) : null}
        </main>
      </>
    );
  }
}
