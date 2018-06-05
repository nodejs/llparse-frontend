import * as assert from 'assert';
import { Buffer } from 'buffer';

import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';
import { Match } from './match';

export interface ISequenceEdge {
  readonly node: IWrap<Node>;
  readonly value: number | undefined;
}

export class Sequence extends Match {
  public edge?: ISequenceEdge;

  constructor(id: IUniqueName, public readonly select: Buffer) {
    super(id);
  }

  public setEdge(node: IWrap<Node>, value?: number | undefined) {
    assert.strictEqual(this.edge, undefined);
    this.edge = { node, value };
  }
}
