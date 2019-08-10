import { h, Component } from "preact";

import Edit from "../edit_components/lazy-edit-component.js";
import Nav from "./FeatureStoriesNav.js";
import NewsletterSection from "./NewsletterSection.js";

const SECTION_TYPE = "NewsletterSection";

export default class FeatureStories extends Component {
  state = { tempSections: [] };

  #addSection = this.addSection.bind(this);
  #editSection = this.editSection.bind(this);

  addSection(e) {
    e.preventDefault();
    this.setState({
      edit: {
        type: SECTION_TYPE,
        saveState: newSectionData =>
          this.setState(state => {
            const tempSections = state.tempSections.concat([newSectionData]);
            return { tempSections };
          }),
      },
    });
  }

  editSection(section) {
    return e => {
      e.preventDefault();

      this.setState({
        edit: {
          ...section,
          saveState: updatedData => {
            const { id } = section;
            const sectionNode = document.getElementById(id);

            sectionNode.id = updatedData.id;
            Object.entries(updatedData).forEach(([key, value]) => {
              const node = sectionNode.querySelector(`[data-key='${key}']`);
              while (node && node.firstChild.nextSibling) {
                node.removeChild(node.firstChild);
              }
              if (node) {
                node.firstChild.textContent = value;
              }
            });

            const navLink = sectionNode.parentElement.querySelector(
              `nav>a[href="#${id}"]`
            );
            navLink.href = "#" + updatedData.id;
            navLink.firstElementChild.src = updatedData.illustration;
            navLink.firstElementChild.alt = updatedData.illustrationDescription;
          },
        },
      });
    };
  }

  render() {
    const sections = (this.props.content || []).concat(this.state.tempSections);

    return (
      <section class="newsletter" data-type="FeatureStories">
        <h2 class="newsletter" data-key="title">
          {this.props.title}
        </h2>

        <Nav
          sections={sections}
          addSection={this.#addSection}
          editSection={this.#editSection}
        />

        <Edit
          componentName={SECTION_TYPE}
          active={!!this.state.edit}
          props={{
            ...this.state.edit,
            resetState: Function.prototype,
          }}
        />

        {sections.map(section => (
          <NewsletterSection {...section} />
        ))}
      </section>
    );
  }
}
