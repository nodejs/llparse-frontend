import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Consume extends Node<node.Consume> {
  protected doBuild(out: string[]): void {
    out.push(this.format(`field=${this.ref.field}`));
  }
}
