import { h, Component, conditionalRendering } from "../utils/jsx.js";
import NewsletterArticle from "./NewsletterArticle";
import NewArticle from "../edit_components/lazy-edit-component.js";

export default class NewsletterSection extends Component {
  #createNewArticleObservers = new Set();
  #newArticleAnchor = document.createComment("create new articles here");

  #createNewArticle = () =>
    this.#createNewArticleObservers.foreach(fn => fn(true));
  #newArticleProps = {
    saveState: this.addNewArticle.bind(this),
    resetState: () => this.#createNewArticleObservers.foreach(fn => fn(false)),
  };

  addNewArticle(data) {
    const newTopic = <NewsletterArticle {...data} />;
    newTopic.then(el => this.#newArticleAnchor.before(el));
  }

  getNbOfColumn(nbOfNonMainArticles) {
    return nbOfNonMainArticles % 2 === 0
      ? 2
      : nbOfNonMainArticles % 3 === 0 || (nbOfNonMainArticles - 1) % 3 === 0
      ? 3
      : 2;
  }

  render() {
    console.log("render");
    const articles = this.props.content || [];
    const nbOfNonMainArticles = articles.filter(({ isMain }) => !isMain).length;
    const nbOfColumns = this.getNbOfColumn(nbOfNonMainArticles);

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
        {this.#newArticleAnchor}
        <button
          data-ignore
          data-do-not-export
          style="grid-column: span var(--nb-of-columns)"
          onClick={this.#createNewArticle}
        >
          Add a new article
        </button>
        {conditionalRendering(
          {
            [true]: () => (
              <NewArticle
                componentName="NewsletterArticle"
                active={true}
                props={this.#newArticleProps}
              />
            ),
            [false]: null,
          },
          this.#createNewArticleObservers,
          false,
          console.error
        )}
      </section>
    );
  }
}
