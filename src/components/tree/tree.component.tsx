import React from "react";
import { observer } from "mobx-react-lite";

import { TreeNodeType } from "../../models/tree";
import { useMst } from "../../models/root";
import { TreeNode } from "../tree-node/tree-node.component";

export const TreeComponent: React.FC<{}> = observer(() => {
  const { tree } = useMst();

  const getRootNodes = (): TreeNodeType[] => {
    const { nodes } = tree;
    return nodes.filter((node) => node.isRoot);
  };

  const getChildNodes = (node: TreeNodeType): TreeNodeType[] | null => {
    const { findNodeWithPath } = tree;
    if (!node.children) return null;
    return node.children.map((path) => findNodeWithPath(path) as TreeNodeType);
  };

  return (
    <div className="tree-component">
      {getRootNodes().map((node) => (
        <TreeNode node={node} getChildNodes={getChildNodes} />
      ))}
    </div>
  );
});
