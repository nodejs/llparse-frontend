import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Empty extends Node<node.Empty> {
  protected doBuild(out: string[]): void {
    out.push(this.format(''));
  }
}
