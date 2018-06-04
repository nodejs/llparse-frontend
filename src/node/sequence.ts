import * as assert from 'assert';
import { Buffer } from 'buffer';

import { Implementation } from '../implementation';
import { IUniqueName } from '../utils';
import { Node } from './base';
import { Match } from './match';

export interface ISequenceEdge<I extends Implementation<Node<I>>> {
  readonly node: I;
  readonly value: number | undefined;
}

export class Sequence<I extends Implementation<Node<I>>> extends Match<I> {
  public edge?: ISequenceEdge<I>;

  constructor(id: IUniqueName, public readonly select: Buffer) {
    super(id);
  }

  public setEdge(node: I, value?: number | undefined) {
    assert.strictEqual(this.edge, undefined);
    this.edge = { node, value };
  }
}
