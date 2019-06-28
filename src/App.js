import { h, Component, Fragment } from "preact";

import Editor from "./Editor.js";
import Error from "./Error.js";

const CONTENT_KEY = "content";
const CONTENT_CACHE = {};

class LazyLoadingComponent extends Component {
  state = { component: <div>Loading</div> };
  componentWillMount() {
    this.props
      .load()
      .then(component => this.setState({ ...this.state, component }))
      .catch(e => {
        console.warn(e);
        this.setState({ ...this.state, component: <Error /> });
      });
  }

  render() {
    return this.state.component;
  }
}

export default class App extends Component {
  state = { previewing: true, content: null };

  componentWillMount() {
    const savedContent = localStorage.getItem(CONTENT_KEY);

    let { content } = this.state;

    try {
      content = this.deserialize(JSON.parse(savedContent));
    } catch (e) {
      console.warn(e);
    }

    this.setState({ ...this.state, content });
  }

  componentDidMount() {
    const DRAG_CLASS_NAME = "dragover";
    document.body.addEventListener("drop", e => {
      e.preventDefault();
      document.documentElement.classList.remove(DRAG_CLASS_NAME);

      for (let file of e.dataTransfer.items || e.dataTransfer.files) {
        if (file.kind === "file") {
          file = file.getAsFile();
        }
        console.log(file);

        file
          .text()
          .then(JSON.parse)
          .then(data => {
            this.setState({ ...this.state, content: this.deserialize(data) });
            this.serialize();
          })
          .catch(console.error);
      }
    });
    document.body.addEventListener("dragover", e => {
      e.preventDefault();
      document.documentElement.classList.add(DRAG_CLASS_NAME);
    });
    document.body.addEventListener("dragleave", e => {
      e.preventDefault();
      document.documentElement.classList.remove(DRAG_CLASS_NAME);
    });
  }

  serialize(array = null, i = null, data = null) {
    if (Array.isArray(array) && Number.isInteger(i)) {
      array[i] = data;
    }
    localStorage.setItem(CONTENT_KEY, JSON.stringify(CONTENT_CACHE));
  }

  deserialize({ main, aside }) {
    const getComponents = array =>
      array.map((data, i, array) => (
        <LazyLoadingComponent
          load={() =>
            import(`./components/${data.type}.js`)
              .then(module => module.default)
              .then(Component => (
                <Component
                  {...data}
                  onChange={data => this.serialize(array, i, data)}
                />
              ))
              .catch(e => {
                console.warn(e);
                return <Error />;
              })
          }
        />
      ));

    CONTENT_CACHE.main = main;
    CONTENT_CACHE.aside = aside;
    return (
      <>
        <main>{getComponents(main)}</main>
        <aside>
          <section className="newsletter aside">{getComponents(aside)}</section>
        </aside>
      </>
    );
  }

  render() {
    return (
      <Editor title="EcoXpert Newsletter template filling">
        {this.state.content}
      </Editor>
    );
  }
}
