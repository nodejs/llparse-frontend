import * as assert from 'assert';
import { Buffer } from 'buffer';

import { Node } from './base';
import { Match } from './match';
import { IUniqueName } from '../utils';

export interface ISequenceEdge {
  readonly node: Node;
  readonly value: number | undefined;
}

export abstract class Sequence extends Match {
  protected edge?: ISequenceEdge;

  constructor(id: IUniqueName, private readonly select: Buffer) {
    super(id);
  }

  public setEdge(node: Node, value?: number | undefined) {
    assert.strictEqual(this.edge, undefined);
    this.edge = { node, value };
  }
}
