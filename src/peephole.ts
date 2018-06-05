import { Node, Empty } from './node';
import { IWrap } from './wrap';

type WrapNode = IWrap<Node>;
type WrapList = ReadonlyArray<WrapNode>;

export class Peephole {
  public optimize(root: WrapNode, nodes: WrapList): WrapNode {
    let changed = new Set(nodes);

    while (changed.size !== 0) {
      const previous = changed;
      changed = new Set();

      for (const node of previous) {
        if (this.optimizeNode(node)) {
          changed.add(node);
        }
      }
    }

    while (root.ref instanceof Empty) {
      if (!root.ref.otherwise!.noAdvance) {
        break;
      }

      root = root.ref.otherwise!.node;
    }

    return root;
  }

  public optimizeNode(node: WrapNode): boolean {
    let changed = false;
    for (const slot of node.ref.getSlots()) {
      if (!(slot.node.ref instanceof Empty)) {
        continue;
      }

      const otherwise = slot.node.ref.otherwise!;

      // Node actively skips, can't optimize!
      if (!otherwise.noAdvance) {
        continue;
      }

      slot.node = otherwise.node;
      changed = true;
    }
    return changed;
  }
}
