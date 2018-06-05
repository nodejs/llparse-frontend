import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Single extends Node<node.Single> {
  public build(): string {
    const edges: string[] = [];
    for (const edge of this.ref.edges) {
      edges.push(`${edge.key}${edge.noAdvance ? '-no_adv-' : ''}`);
    }
    return '<Single ' + edges.join(' ') + '/>';
  }
}
