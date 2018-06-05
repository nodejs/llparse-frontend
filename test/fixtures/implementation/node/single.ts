import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Single extends Node<node.Single> {
  protected doBuild(out: string[]): void {
    const edges: string[] = [];
    for (const edge of this.ref.edges) {
      edges.push(`k${edge.key}${edge.noAdvance ? '-no_adv-' : ''}=` +
        `${edge.node.ref.id.name}`);
    }
    out.push(this.format(edges.join(' ')));

    for (const edge of this.ref.edges) {
      const edgeNode = edge.node as Node<node.Node>;
      edgeNode.build(out);
    }
  }
}
