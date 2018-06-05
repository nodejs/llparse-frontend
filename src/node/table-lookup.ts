import * as assert from 'assert';

import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';
import { Match } from './match';
import { Slot } from './slot';

export interface ITableEdge {
  readonly keys: ReadonlyArray<number>;
  node: IWrap<Node>;
  readonly noAdvance: boolean;
}

export class TableLookup extends Match {
  public readonly edges: ITableEdge[] = [];

  public addEdge(edge: ITableEdge): void {
    this.edges.push(edge);
  }

  protected *buildSlots() {
    for (const edge of this.edges) {
      yield new Slot(edge.node, (value) => edge.node = value);
    }

    yield* super.buildSlots();
  }
}
