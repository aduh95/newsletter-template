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

    const content = savedContent
      ? this.deserialize(JSON.parse(savedContent))
      : this.state.content;
    this.setState({ ...this.state, content });
  }

  componentDidUpdate() {}

  serialize(array, i, data) {
    array[i] = data;
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
