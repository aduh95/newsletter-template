export const OPERATION_ADD = 1;
export const OPERATION_SET = 2;
export const OPERATION_REMOVE = 4;
export const OPERATION_MOVE = 8;

function add({ target, value, position }) {
  const parentBlock = contentBlocks[target];

  if (!Array.isArray(parentBlock.content)) {
    parentBlock.content = [];
  }

  const { content } = parentBlock;
  const newBlockID = getBlockIDFromStructureChunk(value);

  if (position) {
    content.splice(position, 0, newBlockID);
  } else {
    content.push(newBlockID);
  }

  return {
    type: OPERATION_REMOVE,
    target,
    value: newBlockID,
  };
}

function update({ target, key, value }) {
  const parentBlock = contentBlocks[target];
  const oldValue = parentBlock[key];

  parentBlock[key] = value;

  return { type: OPERATION_UPDATE, target, key, value: oldValue };
}

function remove({ target, value }) {
  const { content } = contentBlocks[target];
  const position = content.indexOf(value);
  content.splice(position, 1);
  return { type: OPERATION_MOVE, target, value, position };
}

function move({ target, value, position }) {
  const { content } = contentBlocks[target];
  if (position) {
    content.splice(position, 0, value);
  } else {
    content.push(value);
  }
  return { type: OPERATION_REMOVE, target, value };
}

export default Object.freeze({
  [OPERATION_ADD]: add,
  [OPERATION_SET]: update,
  [OPERATION_REMOVE]: remove,
  [OPERATION_MOVE]: move,
});
