import { h, Component } from "../utils/jsx.js"

import Edit from "../edit_components/lazy-edit-component.js";
import Nav from "./FeatureStoriesNav.js";
import NewsletterSection from "./NewsletterSection.js";

const SECTION_TYPE = "NewsletterSection";

export default class FeatureStories extends Component {
  state = { newSection: null };

  #addSection = this.addSection.bind(this);
  #editSection = this.editSection.bind(this);
  #resetState = () => this.setState({ edit: null });

  #readyToConsumeState = false;
  #readyToCleanState = false;

  addSection(e) {
    e.preventDefault();
    this.setState({
      edit: {
        type: SECTION_TYPE,
        saveState: newSectionData => {
          this.setState(
            {
              edit: null,
              newSection: (
                <output
                  data-request-render
                  data-json={JSON.stringify(newSectionData)}
                />
              ),
            },
            () => (this.#readyToConsumeState = true)
          );
        },
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

  componentDidUpdate() {
    if (this.#readyToCleanState) {
      this.setState(
        { newSection: null },
        () => (this.#readyToCleanState = false)
      );
    } else if (this.#readyToConsumeState) {
      this.#readyToCleanState = true;
      this.#readyToConsumeState = false;
    }
  }

  render() {
    console.log("render");
    const sections = this.props.content || [];

    return (
      <section class="newsletter" data-type="FeatureStories">
        <h2 class="newsletter" data-key="title">
          {this.props.title || "[[Title]]"}
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
            resetState: this.#resetState,
          }}
        />

        {sections.map(section => (
          <NewsletterSection {...section} />
        ))}
        {this.state.newSection}
      </section>
    );
  }
}
