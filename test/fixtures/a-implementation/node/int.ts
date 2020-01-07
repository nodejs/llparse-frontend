import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Int extends Node<node.Int> {
  protected doBuild(out: string[]): void {
    out.push(this.format(`byteOffset=${this.ref.byteOffset}`));
  }
}
