import { node } from '../../../../src/frontend';
import { Node } from './base';

export class TableLookup extends Node<node.TableLookup> {
  protected doBuild(out: string[]): void {
    out.push(this.format(''));
  }
}
