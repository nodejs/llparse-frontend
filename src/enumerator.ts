import { Node } from './node';
import { IWrap } from './wrap';

export class Enumerator {
  public getAllNodes(root: IWrap<Node>): ReadonlyArray<IWrap<Node>> {
    const nodes: Set<IWrap<Node>> = new Set();
    const queue = [ root ];

    while (queue.length !== 0) {
      const node = queue.pop()!;
      for (const slot of node.ref.getSlots()) {
        if (nodes.has(slot.node)) {
          continue;
        }

        nodes.add(slot.node);
        queue.push(slot.node);
      }
    }

    return Array.from(nodes);
  }
}
