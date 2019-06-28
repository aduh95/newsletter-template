import { h, Component } from "preact";

export default class AsideList extends Component {
  state = {
    content: this.props.content || [],
  };
  render() {
    return (
      <article>
        <h4>{this.props.title}</h4>

        <ul>
          {this.state.content.map(({ label, href }) => (
            <li>
              <a href={href} target="_blank" rel="noopener">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </article>
    );
  }
}
