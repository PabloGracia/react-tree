import React from "react";
import { Icon } from "@blueprintjs/core";

import { TreeNodeType } from "../../models/tree";
import { getSnapshot } from "mobx-state-tree";

interface Props {
  node: TreeNodeType;
  getChildNodes: (node: TreeNodeType) => Array<TreeNodeType> | null;
}

export const TreeNode: React.FC<Props> = (props: Props) => {
  const { node, getChildNodes } = props;
  const child_nodes = getChildNodes(node);

  const onNodeClicked = () => {
    node.toggleOpen();
    console.log(getSnapshot(node));
    console.log(`is ${node.path} open?: ${node.isOpen}`);
  };

  return (
    <React.Fragment>
      <div onClick={onNodeClicked}>
        <Icon icon={props.node.isOpen ? "chevron-down" : "chevron-right"} />
        {props.node.path}
      </div>
      {child_nodes &&
        node.isOpen &&
        child_nodes.map((childNode) => (
          <TreeNode {...props} node={childNode} />
        ))}
    </React.Fragment>
  );
};
