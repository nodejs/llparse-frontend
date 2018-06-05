import * as assert from 'assert';
import { Buffer } from 'buffer';

import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';
import { Match } from './match';
import { Slot } from './slot';

interface ISequenceEdge {
  node: IWrap<Node>;
  readonly value: number | undefined;
}

export interface IReadonlySequenceEdge {
  readonly node: IWrap<Node>;
  readonly value: number | undefined;
}

export class Sequence extends Match {
  private privEdge?: ISequenceEdge;

  constructor(id: IUniqueName, public readonly select: Buffer) {
    super(id);
  }

  public setEdge(node: IWrap<Node>, value?: number | undefined) {
    assert.strictEqual(this.privEdge, undefined);
    this.privEdge = { node, value };
  }

  public get edge(): IReadonlySequenceEdge | undefined {
    return this.privEdge;
  }

  protected *buildSlots() {
    const edge = this.privEdge;
    if (edge !== undefined) {
      yield new Slot(edge.node, (value) => edge.node = value);
    }

    yield* super.buildSlots();
  }
}
