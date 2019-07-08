import { h, Component } from "preact";
import Nav from "./FeatureStoriesNav.js";

import NewsletterSection from "./NewsletterSection.js";

export default class FeatureStories extends Component {
  render() {
    const sections = this.props.content || [];

    return (
      <section class="newsletter" data-name="FeatureStories">
        <h2 class="newsletter">
          {this.props.title}&nbsp;&mdash; Feature Stories
        </h2>

        <Nav sections={sections} />

        {sections.map(section => (
          <NewsletterSection {...section} />
        ))}
      </section>
    );
  }
}
