import { h, Component, Fragment } from "../utils/jsx.js"

export default class NewletterComponent extends Component {
  onChange() {
    this.props.onChange(this);
  }
}
