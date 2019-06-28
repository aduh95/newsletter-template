import { h, Component, Fragment } from "preact";

export default class NewletterComponent extends Component {
  onChange() {
    this.props.onChange(this);
  }
}
