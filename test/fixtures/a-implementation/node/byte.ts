import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Byte extends Node<node.Byte> {
  protected doBuild(out: string[]): void {
    out.push(this.format(''));
  }
}
