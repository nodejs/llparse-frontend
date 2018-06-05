import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Pause extends Node<node.Pause> {
  protected doBuild(out: string[]): void {
    out.push(this.format(''));
  }
}
