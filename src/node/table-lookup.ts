import * as assert from 'assert';

import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';
import { Match } from './match';
import { Slot } from './slot';

interface ITableEdge {
  readonly keys: ReadonlyArray<number>;
  node: IWrap<Node>;
  readonly noAdvance: boolean;
}

export interface IReadonlyTableEdge {
  readonly keys: ReadonlyArray<number>;
  readonly node: IWrap<Node>;
  readonly noAdvance: boolean;
}

export class TableLookup extends Match {
  private readonly privEdges: ITableEdge[] = [];

  public addEdge(edge: IReadonlyTableEdge): void {
    this.privEdges.push({
      keys: edge.keys,
      noAdvance: edge.noAdvance,
      node: edge.node,
    });
  }

  public get edges(): ReadonlyArray<IReadonlyTableEdge> {
    return this.privEdges;
  }

  protected *buildSlots() {
    for (const edge of this.privEdges) {
      yield new Slot(edge.node, (value) => edge.node = value);
    }

    yield* super.buildSlots();
  }
}
