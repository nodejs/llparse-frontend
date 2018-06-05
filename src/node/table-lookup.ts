import * as assert from 'assert';

import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';
import { Match } from './match';

export interface ITableEdge {
  readonly keys: ReadonlyArray<number>;
  readonly node: IWrap<Node>;
  readonly noAdvance: boolean;
}

export class TableLookup extends Match {
  public readonly edges: ITableEdge[] = [];

  public addEdge(edge: ITableEdge): void {
    this.edges.push(edge);
  }
}
