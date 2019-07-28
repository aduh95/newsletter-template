import { h, Component, createRef } from "preact";

class UpdateAsideList extends Component {
  dialog = createRef();

  static getDerivedStateFromProps({ type, title, content }) {
    return { type, title, content };
  }

  componentDidMount() {
    const { current } = this.dialog;
    current.addEventListener("close", e => {
      const { returnValue } = e.target;

      this.props.saveState(returnValue);
    });

    const focusIndex = this.props.focus.match(/^(.+)\[(\d+)\]$/);
    const focusElement = focusIndex
      ? current
          .querySelectorAll(`input[name=${focusIndex[1]}]`)
          .item(focusIndex[2])
      : current.querySelector(`input[name=${this.props.focus}]`);

    focusElement?.focus();
  }

  handleChange(event, index) {
    const { name, value } = event.target;
    const { content } = this.state;

    if (index === content.length) {
      content.push({ [name]: value });
    } else {
      content[index][name] = value;
    }

    this.setState({ content });
  }

  onSubmit(e) {
    e.preventDefault();
    this.dialog.current.close(JSON.stringify(this.state));
  }

  onReset(e) {
    e.preventDefault();
    this.dialog.current.close();
  }

  render() {
    const list = this.state.content || [];

    return (
      <dialog open ref={this.dialog}>
        <form
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <div>
            <label>
              Title:&nbsp;
              <input name="title" value={this.props.title} />
            </label>
          </div>
          <ul>
            {list.concat([{}]).map(({ label, href }, i) => (
              <li>
                <input
                  name="label"
                  value={label || ""}
                  placeholder="Link label"
                  onChange={e => this.handleChange(e, i)}
                />
                <input
                  name="href"
                  value={href || ""}
                  placeholder="Link URL"
                  onChange={e => this.handleChange(e, i)}
                  type="url"
                />
              </li>
            ))}
          </ul>
          <div>
            <button type="submit">Save</button>
            <button type="reset">Cancel</button>
          </div>
        </form>
      </dialog>
    );
  }
}

export default class AsideList extends Component {
  state = { writeMode: false };

  update(data) {
    this.setState({ writeMode: false, data });
  }

  static getDerivedStateFromProps(nextProps) {
    return { data: JSON.stringify(nextProps) };
  }

  render() {
    const list = this.props.content || [];

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
        {this.state.writeMode ? (
          <UpdateAsideList
            {...this.props}
            focus={this.state.focus}
            saveState={this.update.bind(this)}
          />
        ) : null}
      </article>
    );
  }
}
