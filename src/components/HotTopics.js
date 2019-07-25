import { h, Component } from "preact";
import NewsletterArticle from "./NewsletterArticle";

export default class HotTopics extends Component {
  render() {
    const articles = this.props.content || [];

    return (
      <section class="newsletter hot-topics" data-type="HotTopics">
        <h2 data-key="title">{this.props.title}</h2>

        {articles.map(article => (
          <NewsletterArticle {...article} />
        ))}
      </section>
    );
  }
}
