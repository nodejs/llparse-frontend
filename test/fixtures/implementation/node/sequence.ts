import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Sequence extends Node<node.Sequence> {
  protected doBuild(out: string[]): void {
    let str = `select="${this.ref.select.toString('hex')}" ` +
        `edge="${this.ref.edge!.node.ref.id.name}"`;
    if (this.ref.edge!.value !== undefined) {
      str += `:${this.ref.edge!.value}`;
    }
    out.push(this.format(str));
    const edgeNode = this.ref.edge!.node as Node<node.Node>;
    edgeNode.build(out);
  }
}
