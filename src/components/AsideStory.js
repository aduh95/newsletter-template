import { h, Component } from "preact";

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
