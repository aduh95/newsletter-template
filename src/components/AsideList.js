import { h, Component } from "preact";

export default class AsideList extends Component {
  render() {
    const list = this.props.content || [];
    return (
      <article data-type="AsideList" data-json={JSON.stringify(this.props)}>
        <h4 data-key="title">{this.props.title}</h4>

        <ul>
          {list.map(({ label, href }) => (
            <li>
              <a data-key="label" href={href} target="_blank" rel="noopener">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </article>
    );
  }
}
