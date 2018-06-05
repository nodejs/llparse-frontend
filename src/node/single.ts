import * as assert from 'assert';

import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';
import { Match } from './match';
import { Slot } from './slot';

interface ISingleEdge {
  readonly key: number;
  node: IWrap<Node>;
  readonly noAdvance: boolean;
  readonly value: number | undefined;
}

export interface IReadonlySingleEdge {
  readonly key: number;
  node: IWrap<Node>;
  readonly noAdvance: boolean;
  readonly value: number | undefined;
}

export class Single extends Match {
  private readonly privEdges: ISingleEdge[] = [];

  public addEdge(edge: IReadonlySingleEdge): void {
    this.privEdges.push({
      key: edge.key,
      noAdvance: edge.noAdvance,
      node: edge.node,
      value: edge.value,
    });
  }

  public get edges(): ReadonlyArray<IReadonlySingleEdge> {
    return this.privEdges;
  }

  protected *buildSlots() {
    for (const edge of this.privEdges) {
      yield new Slot(edge.node, (value) => edge.node = value);
    }

    yield* super.buildSlots();
  }
}
