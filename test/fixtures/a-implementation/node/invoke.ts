import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Invoke extends Node<node.Invoke> {
  protected doBuild(out: string[]): void {
    out.push(this.format(''));
  }
}
