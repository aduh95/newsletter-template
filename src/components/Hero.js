import { h, Component } from "../utils/jsx.js";
import EcoXpertLogo from "./EcoXpertLogo.js";

export default class Hero extends Component {
  render() {
    console.log("render");
    return (
      <section className="newsletter-hero" data-type="Hero">
        <h1 data-key="title">{this.props.title || "[[Title]]"}</h1>

        <h6 data-key="date">{this.props.date || "[[Date]]"}</h6>
        <EcoXpertLogo />
      </section>
    );
  }
}
