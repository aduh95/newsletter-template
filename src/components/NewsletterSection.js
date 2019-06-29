import { h, Component } from "preact";
import NewsletterArticle from "./NewsletterArticle";

export default class NewsletterSection extends Component {
  render() {
    const articles = this.props.content || [];
    return (
      <section
        className="newsletter"
        style={{ ["--nb-of-articles"]: articles.length }}
      >
        <h2 className="newsletter">{this.props.title}</h2>
        {articles.map(article => (
          <NewsletterArticle {...article} />
        ))}
      </section>
    );
  }
}
