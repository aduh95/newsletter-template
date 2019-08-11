import { h, Component } from "preact";
import NewsletterArticle from "./NewsletterArticle";
import NewArticle from "../edit_components/lazy-edit-component.js";

export default class HotTopics extends Component {
  state = { newTopic: null };

  #createNewArticle = this.setState.bind(this, { openNewArticleDialog: true });
  #newArticleProps = {
    saveState: this.addNewArticle.bind(this),
    resetState: () => this.setState({ openNewArticleDialog: false }),
  };

  addNewArticle(data) {
    this.setState({
      newTopic: <output data-request-render data-json={data} />,
      openNewArticleDialog: false,
    });
  }

  render() {
    const articles = this.props.content || [];

    return (
      <section class="newsletter hot-topics" data-type="HotTopics">
        <h2 data-key="title">{this.props.title || "[[Title]]"}</h2>

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
        {this.state.newTopic}
      </section>
    );
  }
}
