import { h, Component, createRef } from "preact";

class UpdateAsideList extends Component {
  dialog = createRef();

  componentWillMount() {
    const { type, title, content } = this.props;
    this.setState({
      type,
      title,
      content: Array.isArray(content) ? content.map(obj => ({ ...obj })) : [],
    });
  }

  componentDidMount() {
    this.update();
  }
  componentDidUpdate(prevProps) {
    this.update(prevProps);
  }

  update(prevProps = {}) {
    const { current } = this.dialog;

    if (current && !current.open) {
      current.showModal();
    }

    if (current && prevProps.focus !== this.props.focus) {
      const focusSelector = this.props.focus;

      const focusIndex = focusSelector?.match(/^(.+)\[(\d+)\]$/);
      const focusElement = focusIndex
        ? current
            .querySelectorAll(`input[name=${focusIndex[1]}]`)
            .item(focusIndex[2])
        : current.querySelector(`input[name=${focusSelector}]`);

      focusElement?.focus();
    }
  }

  handleEscape(e) {
    if (e.key === "Escape") {
      this.onReset(e);
    }
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

  handleSubmit(e) {
    const data = { ...this.state };
    data.content = this.state.content
      .filter(({ label, href }) => label || href)
      .map(({ label, href }) => ({
        label: label || "[Link]",
        href: href || "about:blank",
      }));

    this.props.saveState(data);
  }

  onReset(e) {
    e.stopPropagation();
    this.props.resetState();
  }

  render() {
    const list = this.state.content || [];

    return (
      <dialog
        data-ignore
        onClose={this.handleSubmit.bind(this)}
        onCancel={this.onReset.bind(this)}
        ref={this.dialog}
      >
        <form method="dialog">
          <div>
            <label>
              Title:&nbsp;
              <input
                name="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
            </label>

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

            <button type="submit" onClick={e => e.target.form.submit()}>
              Save
            </button>
            <button type="reset" onClick={this.onReset.bind(this)}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    );
  }
}

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
            resetState={() => this.setState({ writeMode: false })}
          />
        ) : null}
      </article>
    );
  }
}
