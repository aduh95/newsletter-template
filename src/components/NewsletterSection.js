import { h, Component } from "preact";
import NewsletterArticle from "./NewsletterArticle";

export default class NewsletterSection extends Component {
  state = { articles: this.props.content || [] };

  render() {
    return (
      <section className="newsletter">
        <h2 className="newsletter">{this.props.title}</h2>
        {this.state.articles.map(article => (
          <NewsletterArticle {...article} />
        ))}
      </section>
    );
  }
}
