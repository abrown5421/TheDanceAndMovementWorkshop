import { v4 as uuidv4 } from 'uuid';

export function addUIDsToTree<T extends { children?: any[] | string; uid?: string }>(node: T): T {
  const newNode = { ...node, uid: node.uid || uuidv4() };

  if (Array.isArray(node.children)) {
    newNode.children = node.children.map(addUIDsToTree);
  }

  return newNode;
}