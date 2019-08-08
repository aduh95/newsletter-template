import { h, Component } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

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
            color: "black",
          }}
          data-link-to-create
          onClick={this.props.addSection}
        >
          <FontAwesomeIcon icon={faFolderPlus} size="2x" />
        </a>
      </nav>
    );
  }
}
