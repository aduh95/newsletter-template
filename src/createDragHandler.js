const DRAG_CLASS_NAME = "drop-candidate-for-reordering";
const TO_BE_DELETED_CLASS_NAME = "to-be-deleted";

/**
 * @param {DragEvent} e
 */
const dragStartHandler = callback => e => {
  // TODO
  const { target } = e;
  const { parentElement } = target;
  let destination;

  parentElement.classList.add(DRAG_CLASS_NAME);

  let updateDestination;
  const updateClassNames = () => {
    updateDestination = null;
    parentElement
      .querySelector("." + DRAG_CLASS_NAME)
      ?.classList.remove(DRAG_CLASS_NAME);
    if (destination) {
      target.classList.remove(TO_BE_DELETED_CLASS_NAME);
      destination.classList.add(DRAG_CLASS_NAME);
    } else {
      target.classList.add(TO_BE_DELETED_CLASS_NAME);
    }
  };

  /**
   * @param {DragEvent} e
   */
  const dragOverHandler = e => {
    e.stopImmediatePropagation();
    destination = e.toElement;
    if (!updateDestination) {
      updateDestination = requestAnimationFrame(updateClassNames);
    }
  };
  const dragLeaveHandler = () => {
    destination = null;
    if (!updateDestination) {
      updateDestination = requestAnimationFrame(updateClassNames);
    }
  };

  parentElement.addEventListener("dragover", dragOverHandler, {
    passive: true,
  });
  document.body.addEventListener("dragover", dragLeaveHandler, {
    passive: true,
  });
  target.addEventListener(
    "dragend",
    e => {
      Array.from(document.getElementsByClassName(DRAG_CLASS_NAME), el =>
        el.classList.remove(DRAG_CLASS_NAME)
      );
      callback(e, destination);
      parentElement.removeEventListener("dragover", dragOverHandler);
      document.body.removeEventListener("dragover", dragLeaveHandler);
    },
    {
      once: true,
      passive: true,
    }
  );
};

export default dragStartHandler;
