import { h, Component } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faPlusSquare, faImage } from "@fortawesome/free-solid-svg-icons";

export default class FeatureStoriesNav extends Component {
  render() {
    const { sections } = this.props;
    return (
      <nav class="newsletter" data-ignore>
        {sections.map(section => (
          <a
            href={"#" + section.id}
            data-link-to-edit
            onClick={this.props.editSection(section)}
          >
            <img
              src={section.illustration}
              alt={section.illustrationDescription}
            />
          </a>
        ))}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          data-link-to-create
          onClick={this.props.addSection}
        >
          <FontAwesomeIcon icon={faPlusSquare} />
        </a>
      </nav>
    );
  }
}
