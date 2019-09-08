import operations from "./state-apply-revert-operations.js";

let currentHeadBlock = null;
const contentBlocks = [];

const getBlockIDFromStructureChunk = structureChunk => {
  const obj = Object.assign({}, structureChunk);

  if (Array.isArray(structureChunk.content)) {
    obj.content = structureChunk.content.map(getBlockIDFromStructureChunk);
  }

  return contentBlocks.push(obj) - 1;
};

export function initiateWith(structure) {
  currentHeadBlock = getBlockIDFromStructureChunk(structure);
}

const getStructureChunkFromBlockId = id => {
  const structure = Object.assign({}, contentBlocks[id]);

  if (Array.isArray(structure.content)) {
    structure.content = structure.content.map(getStructureChunkFromBlockId);
  }

  return structure;
};

export function getCurrentState() {
  return getStructureChunkFromBlockId(currentHeadBlock);
}

/**
 * Applies a state update operation and returns a revert operation
 * @param operation
 * @returns revert operation
 */
export default function applyOperation(operation) {
  const { type } = operation;

  return operations[type](operation);
}
