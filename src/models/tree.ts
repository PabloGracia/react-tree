import { types, Instance, SnapshotOut } from "mobx-state-tree";

export const TreeNode = types
  .model({
    path: types.optional(types.string, ""),
    type: types.optional(types.string, ""),
    isRoot: types.optional(types.boolean, false),
    isOpen: types.optional(types.boolean, false),
    children: types.array(types.string),
    content: types.optional(types.string, ""),
  })
  .actions((self) => ({
    toggleOpen(): void {
      self.isOpen = !self.isOpen;
    },
  }));

export interface TreeNodeSnapshot extends SnapshotOut<typeof TreeNode> {}
export type TreeNodeType = Instance<typeof TreeNode>;

export const Tree = types
  .model({
    nodes: types.array(TreeNode),
  })
  .actions((self) => ({
    addNode(node: TreeNodeSnapshot) {
      self.nodes.push(node);
    },
    addMultipleNodes(multiple_nodes: Array<TreeNodeSnapshot>) {
      for (const node of multiple_nodes) {
        self.nodes.push(node);
      }
    },
    findNodeWithPath(path: string): TreeNodeType | null {
      for (const node of self.nodes) {
        if (node.path === path) return node;
      }
      return null;
    },
    toggleNodeOpen(node: TreeNodeType) {
      // Toggles the open value of a node
      node.isOpen = !node.isOpen;
    },
    closeRecursivelyNode(node: TreeNodeType) {
      // Close recursively a node and its children (and their children...)
      const recursiveClose = (node: TreeNodeType) => {
        node.isOpen = false;

        for (const child of node.children) {
          recursiveClose(this.findNodeWithPath(child)!);
        }
      };

      recursiveClose(node);
    },
  }));

export type TreeType = Instance<typeof Tree>;
