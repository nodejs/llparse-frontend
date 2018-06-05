import * as assert from 'assert';

import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';
import { Match } from './match';
import { Slot } from './slot';

export interface ISingleEdge {
  readonly key: number;
  node: IWrap<Node>;
  readonly noAdvance: boolean;
  readonly value: number | undefined;
}

export class Single extends Match {
  public readonly edges: ISingleEdge[] = [];

  public addEdge(edge: ISingleEdge): void {
    this.edges.push(edge);
  }

  protected *buildSlots() {
    for (const edge of this.edges) {
      yield new Slot(edge.node, (value) => edge.node = value);
    }

    yield* super.buildSlots();
  }
}
