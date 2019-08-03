import { h, Component } from "preact";

import createDragHandler from "../createDragHandler.js";

export default class OrderedList extends Component {
  handleDrag({ srcElement }, destination) {
    const siblings = Array.from(srcElement.parentNode.children);
    while (destination && destination.parentNode !== srcElement.parentNode) {
      destination = destination.parentNode;
    }

    const draggedElementIndex = siblings.indexOf(srcElement);
    const targetElementIndex = siblings.indexOf(destination);

    this.props.handleReOrder(draggedElementIndex, targetElementIndex);
  }

  render() {
    const list = this.props.content || [];

    return (
      <ol>
        {list.concat([{}]).map(({ label, href }, i) => (
          <li
            draggable
            onDragStart={createDragHandler(this.handleDrag.bind(this))}
            key={i}
          >
            <input
              name="label"
              value={label || ""}
              placeholder="Link label"
              onChange={e => this.props.handleChange(e, i)}
            />
            <input
              name="href"
              value={href || ""}
              placeholder="Link URL"
              onChange={e => this.props.handleChange(e, i)}
              type="url"
            />
          </li>
        ))}
      </ol>
    );
  }
}
