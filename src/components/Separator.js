import { h } from "preact";
import { PureComponent } from "preact/compat";

export default class NewsletterSection extends PureComponent {
  render() {
    console.log("render");
    return <hr data-type="Separator" />;
  }
}
