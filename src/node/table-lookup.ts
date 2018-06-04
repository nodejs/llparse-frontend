import * as assert from 'assert';

import { Node } from './base';
import { Match } from './match';
import { IUniqueName } from '../utils';

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
