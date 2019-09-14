import { h, Component, conditionalRendering } from "../utils/jsx.js";
import NewsletterArticle from "./NewsletterArticle";
import NewArticle from "../edit_components/lazy-edit-component.js";

export default class HotTopics extends Component {
  state = { newTopic: null };

  #createNewArticleObservers = new Set();
  #newArticleAnchor = document.createComment("create new articles here");

  #createNewArticle = () =>
    this.#createNewArticleObservers.foreach(fn => fn(true));
  #newArticleProps = {
    saveState: this.addNewArticle.bind(this),
    resetState: () => this.#createNewArticleObservers.foreach(fn => fn(false)),
  };

  #readyToConsumeState = false;
  #readyToCleanState = false;

  addNewArticle(data) {
    const newTopic = <NewsletterArticle {...data} />;
    newTopic.then(el => this.#newArticleAnchor.before(el));
  }

  render() {
    console.log("render");
    const articles = this.props.content || [];

    return (
      <section class="newsletter hot-topics" data-type="HotTopics">
        <h2 data-key="title">{this.props.title || "[[Title]]"}</h2>

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
