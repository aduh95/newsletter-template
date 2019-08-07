import { h, Component, Fragment } from "preact";

export default class Error extends Component {
  resetState(e) {
    e.preventDefault();
    this.props.resetState();
  }

  render() {
    return (
      <div className="error">
        Cannot load this component
        {this.props.resetState ? (
          <>
            <br />
            <a onClick={this.resetState.bind(this)} href="#">
              Reset the app
            </a>
            .
          </>
        ) : null}
      </div>
    );
  }
}
