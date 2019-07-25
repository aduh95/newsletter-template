import { h, Component } from "preact";
import Nav from "./FeatureStoriesNav.js";

import NewsletterSection from "./NewsletterSection.js";

export default class FeatureStories extends Component {
  render() {
    const sections = this.props.content || [];

    return (
      <section class="newsletter" data-type="FeatureStories">
        <h2 class="newsletter" data-key="title">
          {this.props.title}
        </h2>

        <Nav sections={sections} />

        {sections.map(section => (
          <NewsletterSection {...section} />
        ))}
      </section>
    );
  }
}
