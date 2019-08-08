import { h, Component } from "preact";
import Nav from "./FeatureStoriesNav.js";

import NewsletterSection from "./NewsletterSection.js";

export default class FeatureStories extends Component {
  addSection(e) {
    e.preventDefault();
    import("../notify.js").then(module =>
      module.default("Not implemented yet")
    );
  }

  editSection(section) {
    return e => {
      e.preventDefault();
      import("../notify.js").then(module =>
        module.default("Not implemented yet")
      );
      console.log("edit", section);
    };
  }

  render() {
    const sections = this.props.content || [];

    return (
      <section class="newsletter" data-type="FeatureStories">
        <h2 class="newsletter" data-key="title">
          {this.props.title}
        </h2>

        <Nav
          sections={sections}
          addSection={this.addSection.bind(this)}
          editSection={this.editSection.bind(this)}
        />

        {sections.map(section => (
          <NewsletterSection {...section} />
        ))}
      </section>
    );
  }
}
