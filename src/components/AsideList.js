import { h, Component } from "preact";

export default class AsideList extends Component {
  render() {
    const list = this.props.content || [];
    return (
      <article>
        <h4>{this.props.title}</h4>

        <ul>
          {list.map(({ label, href }) => (
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
