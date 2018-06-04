import * as assert from 'assert';

import { IUniqueName } from '../utils';
import { Node } from './base';
import { Match } from './match';

export interface ITableEdge {
  readonly keys: ReadonlyArray<number>;
  readonly node: Node;
  readonly noAdvance: boolean;
}

export abstract class TableLookup extends Match {
  protected readonly edges: ITableEdge[] = [];

  public addEdge(edge: ITableEdge): void {
    this.edges.push(edge);
  }
}
