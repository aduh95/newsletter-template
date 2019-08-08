import { h, Component } from "preact";
import Edit from "../edit_components/lazy-edit-compomponent.js";
import MarkdownContent from "../markdown/MarkdownContent.js";

export default class Footer extends Component {
  state = { writeMode: false };

  update({ text }) {
    this.setState({ writeMode: false });
    Object.assign(this.props, { text });
  }

  render() {
    return (
      <section
        className="newsletter-footer"
        data-type="Footer"
        onClick={e => {
          e.preventDefault();
          this.setState({ writeMode: true });
        }}
      >
        <output hidden data-key="text">
          {this.props.text}
        </output>
        <MarkdownContent
          content={this.props.text}
          attributes={{
            ["data-key"]: true,
            ["data-ignore"]: true,
          }}
        />

        <Edit
          componentName="Footer"
          active={this.state.writeMode}
          props={{
            ...this.props,
            saveState: this.update.bind(this),
            resetState: () => this.setState({ writeMode: false }),
          }}
        />
      </section>
    );
  }
}
