import { node } from '../../../../src/frontend';
import { Node } from './base';

export class SpanStart extends Node<node.SpanStart> {
  protected doBuild(out: string[]): void {
    out.push(this.format(''));
  }
}
