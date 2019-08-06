import { h, Component, Fragment } from "preact";
import statePersistance from "./StatePersistance.js";

export default class SplashScreen extends Component {
  render() {
    return (
      <>
        <header>
          <h1>{this.props.title}</h1>
        </header>
        <main>
          <p>
            <strong>Drag and drop</strong> or <strong>select a file</strong>{" "}
            here
          </p>
          <div>
            <input
              type="file"
              accept="application/json"
              onChange={console.log}
            />
          </div>
          {this.props.previousStateDate ? (
            <>
              <p>
                Or continue where you lefted:{" "}
                <button onClick={() => statePersistance.recoverSaveState()}>
                  Recover last version
                </button>
                &nbsp;
                <small>
                  Saved on {this.props.previousStateDate.toLocaleString()}
                </small>
              </p>
              <p></p>
            </>
          ) : null}
        </main>
      </>
    );
  }
}
