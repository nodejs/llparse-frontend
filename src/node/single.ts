import * as assert from 'assert';

import { Implementation } from '../implementation';
import { IUniqueName } from '../utils';
import { Node } from './base';
import { Match } from './match';

export interface ISingleEdge<I extends Implementation<Node<I>>> {
  readonly key: number;
  readonly node: I;
  readonly noAdvance: boolean;
  readonly value: number | undefined;
}

export class Single<I extends Implementation<Node<I>>> extends Match<I> {
  public readonly edges: ISingleEdge<I>[] = [];

    public addEdge(edge: ISingleEdge<I>): void {
    this.edges.push(edge);
  }
}
