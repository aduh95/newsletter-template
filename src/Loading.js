import { h, Component } from "preact";

export default class Loading extends Component {
  render() {
    return (
      <div data-ignore className="loading">
        Loading...
      </div>
    );
  }
}
