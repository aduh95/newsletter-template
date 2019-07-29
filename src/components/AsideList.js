import { h, Component, Fragment } from "preact";
import { Suspense, lazy } from "preact/compat";

export default class AsideList extends Component {
  state = { writeMode: false, data: JSON.stringify(this.props) };

  update(data) {
    const { title, content } = data;
    this.setState({
      writeMode: false,
      data: JSON.stringify(data),
    });

    Object.assign(this.props, data);
  }

  render() {
    const list = this.props.content || [];
    const UpdateAsideList = this.state.writeMode
      ? lazy(() => import("./UpdateAsideList.js"))
      : Fragment;

    return (
      <article
        data-type="AsideList"
        data-json={this.state.data}
        onClick={e => {
          e.preventDefault();
          this.setState({ writeMode: true, focus: e.toElement?.dataset?.key });
        }}
      >
        <h4 data-key="title">{this.props.title}</h4>

        <ul>
          {list.map(({ label, href }, i) => (
            <li>
              <a
                data-key={`label[${i}]`}
                href={href}
                target="_blank"
                rel="noopener"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <Suspense
          fallback={
            <dialog open data-ignore>
              Loading...
            </dialog>
          }
        >
          <UpdateAsideList
            {...this.props}
            focus={this.state.focus}
            saveState={this.update.bind(this)}
            resetState={() => this.setState({ writeMode: false })}
          />
        </Suspense>
      </article>
    );
  }
}
