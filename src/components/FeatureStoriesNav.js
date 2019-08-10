import { h, Component } from "preact";
import { FontAwesomeIcon } from "@aduh95/preact-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

export default function FeatureStoriesNav({
  addSection,
  editSection,
  sections,
}) {
  return (
    <nav class="newsletter" data-ignore>
      {sections.map(section => (
        <a
          href={"#" + section.id}
          data-link-to-edit
          onClick={editSection(section)}
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
        onClick={addSection}
      >
        <FontAwesomeIcon icon={faFolderPlus} size="2x" />
      </a>
    </nav>
  );
}
