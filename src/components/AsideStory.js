import { h, Component } from "preact";

export default class AsideStory extends Component {
  render() {
    return (
      <article data-name="AsideStory">
        <h4>{this.props.title}</h4>
      </article>
    );
  }
}
