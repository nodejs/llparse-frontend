import { node } from '../../../../src/frontend';
import { Node } from './base';

export class SpanEnd extends Node<node.SpanEnd> {
  protected doBuild(out: string[]): void {
    out.push(this.format(''));
  }
}
