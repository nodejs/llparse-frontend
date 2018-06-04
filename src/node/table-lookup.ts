import * as assert from 'assert';

import { Implementation } from '../implementation';
import { IUniqueName } from '../utils';
import { Node } from './base';
import { Match } from './match';

export interface ITableEdge<I extends Implementation<Node<I>>> {
  readonly keys: ReadonlyArray<number>;
  readonly node: I;
  readonly noAdvance: boolean;
}

export class TableLookup<I extends Implementation<Node<I>>> extends Match<I> {
  public readonly edges: ITableEdge<I>[] = [];

  public addEdge(edge: ITableEdge<I>): void {
    this.edges.push(edge);
  }
}
