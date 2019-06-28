import { h, Component } from "preact";
import NewsletterArticle from "./NewsletterArticle";

export default class HotTopics extends Component {
  state = { articles: this.props.content || [] };

  render() {
    return (
      <section class="newsletter hot-topics">
        <h3>Hot Topics</h3>

        {this.state.articles.map(article => (
          <NewsletterArticle {...article} />
        ))}
      </section>
    );
  }
}
