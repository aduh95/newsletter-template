import { h, Component } from "preact";
import NewsletterArticle from "./NewsletterArticle";
import NewArticle from "../edit_components/lazy-edit-component.js";

export default class NewsletterSection extends Component {
  state = { tempArticles: [] };

  addNewArticle(data) {
    const { tempArticles } = this.state;
    tempArticles.push(data);
    this.setState({ tempArticles });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content.length !== this.props.content.length) {
      this.setState({ tempArticles: [] });
    }
  }

  render() {
    const articles = (this.props.content || []).concat(this.state.tempArticles);
    const nbOfNonMainArticles = articles.filter(({ isMain }) => !isMain).length;
    const nbOfColumns =
      nbOfNonMainArticles % 2 === 0
        ? 2
        : nbOfNonMainArticles % 3 === 0 || (nbOfNonMainArticles - 1) % 3 === 0
        ? 3
        : 2;
    return (
      <section
        className="newsletter"
        data-type="NewsletterSection"
        style={{ ["--nb-of-columns"]: nbOfColumns }}
        id={this.props.id}
      >
        <output hidden data-key="id">
          {this.props.id}
        </output>
        <output hidden data-key="illustration">
          {this.props.illustration}
        </output>
        <output hidden data-key="illustrationDescription">
          {this.props.illustrationDescription}
        </output>

        <h2 className="newsletter" data-key="title">
          {this.props.title}
        </h2>
        {articles.map(article => (
          <NewsletterArticle {...article} />
        ))}
        <button
          data-ignore
          style="grid-column: span var(--nb-of-columns)"
          onClick={e => this.setState({ openNewArticleDialog: true })}
        >
          Add a new article
        </button>
        <NewArticle
          componentName="NewsletterArticle"
          active={this.state.openNewArticleDialog}
          props={{
            saveState: this.addNewArticle.bind(this),
            resetState: () => this.setState({ openNewArticleDialog: false }),
          }}
        />
      </section>
    );
  }
}
