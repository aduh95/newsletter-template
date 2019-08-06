import { h, Component, Fragment } from "preact";

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
          <p>
            Or continue where you lefted: <button>Recover last version</button>
          </p>
        </main>
      </>
    );
  }
}
