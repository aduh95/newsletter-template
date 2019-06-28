import { h, Component } from "preact";
import Nav from "./FeatureStoriesNav.js";

import NewsletterSection from "./NewsletterSection.js";

export default class FeatureStories extends Component {
  state = { sections: this.props.content || [] };

  render() {
    return (
      <section>
        <h2 class="newsletter">
          {this.props.title}&nbsp;&mdash; Feature Stories
        </h2>

        <Nav sections={this.state.sections} />

        {this.state.sections.map(section => (
          <NewsletterSection {...section} />
        ))}
      </section>
    );
  }
}
