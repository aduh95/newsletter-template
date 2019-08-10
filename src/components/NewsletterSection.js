import { h, Component } from "preact";
import NewsletterArticle from "./NewsletterArticle";
import NewArticle from "../edit_components/lazy-edit-component.js";

export default class NewsletterSection extends Component {
  state = { newArticle: null };

  #createNewArticle = this.setState.bind(this, { openNewArticleDialog: true });
  #newArticleProps = {
    saveState: this.addNewArticle.bind(this),
    resetState: () => this.setState({ openNewArticleDialog: false }),
  };

  addNewArticle(data) {
    this.setState({
      newArticle: <output data-request-render data-json={data} />,
      openNewArticleDialog: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.content?.length !== this.props.content?.length) {
      this.setState({ tempArticles: [] });
    }
  }

  render() {
    const articles = this.props.content || [];
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
          data-do-not-export
          style="grid-column: span var(--nb-of-columns)"
          onClick={this.#createNewArticle}
        >
          Add a new article
        </button>
        <NewArticle
          componentName="NewsletterArticle"
          active={this.state.openNewArticleDialog}
          props={this.#newArticleProps}
        />
        {this.state.newArticle}
      </section>
    );
  }
}
