import { h, Component } from "../utils/jsx.js"

export default class AsideStory extends Component {
  render() {
    console.log("render");
    return (
      <article data-type="AsideStory" data-json={JSON.stringify(this.props)}>
        <h4>{this.props.title}</h4>
      </article>
    );
  }
}
