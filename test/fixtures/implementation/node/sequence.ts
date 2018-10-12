import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Sequence extends Node<node.Sequence> {
  protected doBuild(out: string[]): void {
    out.push(this.format(`select="${this.ref.select.toString('hex')}" ` +
        `edge="${this.ref.edge!.node.ref.id.name}"`));
    const edgeNode = this.ref.edge!.node as Node<node.Node>;
    edgeNode.build(out);
  }
}
