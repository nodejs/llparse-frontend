import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Slot } from './slot';

export interface IOtherwiseEdge {
  node: IWrap<Node>;
  readonly noAdvance: boolean;
}

export abstract class Node {
  public otherwise: IOtherwiseEdge | undefined;

  constructor(public readonly id: IUniqueName) {
  }

  public setOtherwise(node: IWrap<Node>, noAdvance: boolean) {
    this.otherwise = { node, noAdvance };
  }

  // TODO(indutny): cache
  public *getSlots() {
    const otherwise = this.otherwise;
    if (otherwise !== undefined) {
      yield new Slot(otherwise.node, (value) => otherwise.node = value);
    }
  }
}
