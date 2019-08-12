const DRAG_CLASS_NAME = "drop-candidate-for-reordering";
const TO_BE_DELETED_CLASS_NAME = "to-be-deleted";

const globalDragOverListeners = new Set();

export const setGlobalDragOverListener = listener => {
  document.body.addEventListener("dragover", listener);
  globalDragOverListeners.add(listener);
};
export const removeGlobalDragOverListener = listener => {
  document.body.removeEventListener("dragover", listener);
  globalDragOverListeners.delete(listener);
};

/**
 * @param {(e:DragEvent)=>void} callback
 * @returns {(e: DragEvent)=>void}
 */
const dragStartHandler = callback => e => {
  const { target } = e;
  const { parentElement } = target;
  let draggedOverDestination, droppedDestination;

  e.dataTransfer.effectAllowed = "move";
  parentElement.style.setProperty(
    "--dragged-element-height",
    target.offsetHeight + "px"
  );

  for (const listener of globalDragOverListeners) {
    document.body.removeEventListener("dragover", listener);
  }
  parentElement.classList.add(DRAG_CLASS_NAME);

  let updateDestination;
  const updateClassNames = () => {
    updateDestination = null;
    parentElement
      .querySelector("." + DRAG_CLASS_NAME)
      ?.classList.remove(DRAG_CLASS_NAME);
    if (draggedOverDestination) {
      target.classList.remove(TO_BE_DELETED_CLASS_NAME);
      if (draggedOverDestination !== target) {
        draggedOverDestination.classList.add(DRAG_CLASS_NAME);
      }
    } else {
      target.classList.add(TO_BE_DELETED_CLASS_NAME);
    }
  };

  /**
   * @param {DragEvent} e
   */
  const dragOverHandler = e => {
    e.stopPropagation();
    e.preventDefault();
    draggedOverDestination = e.currentTarget;
    if (!updateDestination) {
      updateDestination = requestAnimationFrame(updateClassNames);
    }
  };
  const dragLeaveHandler = e => {
    e.preventDefault();
    draggedOverDestination = null;
    if (!updateDestination) {
      updateDestination = requestAnimationFrame(updateClassNames);
    }
  };
  const dropOnSiblingHandler = e => {
    e.stopPropagation();
    e.preventDefault();
    droppedDestination = e.currentTarget;
  };
  const dropOutHandler = e => {
    e.preventDefault();
    droppedDestination = null;
  };

  Array.from(parentElement.children, el => {
    el.addEventListener("drop", dropOnSiblingHandler);
    el.addEventListener("dragover", dragOverHandler);
  });
  document.body.addEventListener("dragover", dragLeaveHandler);
  document.body.addEventListener("drop", dropOutHandler);
  target.addEventListener(
    "dragend",
    e => {
      Array.from(document.getElementsByClassName(DRAG_CLASS_NAME), el =>
        el.classList.remove(DRAG_CLASS_NAME)
      );

      document.body.removeEventListener("dragover", dragLeaveHandler);
      document.body.removeEventListener("drop", dropOutHandler);
      for (const child of parentElement.children) {
        child.removeEventListener("drop", dropOnSiblingHandler);
        child.removeEventListener("dragover", dragOverHandler);
      }
      for (const listener of globalDragOverListeners) {
        document.body.addEventListener("dragover", listener);
      }

      if (droppedDestination !== undefined) {
        // The callback won't be called if event has been cancelled
        callback(e, droppedDestination);
      }
    },
    {
      once: true,
      passive: true,
    }
  );
};

export default dragStartHandler;
