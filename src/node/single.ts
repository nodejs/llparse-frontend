import * as assert from 'assert';

import { IUniqueName } from '../utils';
import { Node } from './base';
import { Match } from './match';

export interface ISingleEdge {
  readonly key: number;
  readonly node: Node;
  readonly noAdvance: boolean;
  readonly value: number | undefined;
}

export class Single extends Match {
  public readonly edges: ISingleEdge[] = [];

  public addEdge(edge: ISingleEdge): void {
    this.edges.push(edge);
  }
}
