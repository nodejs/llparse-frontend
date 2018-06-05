import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Slot } from './slot';

export interface IOtherwiseEdge {
  node: IWrap<Node>;
  readonly noAdvance: boolean;
}

export abstract class Node {
  private privOtherwise: IOtherwiseEdge | undefined;
  private privSlots: ReadonlyArray<Slot> | undefined;

  constructor(public readonly id: IUniqueName) {
  }

  public setOtherwise(node: IWrap<Node>, noAdvance: boolean) {
    this.privOtherwise = { node, noAdvance };
  }

  public get otherwise(): IOtherwiseEdge | undefined {
    return this.privOtherwise;
  }

  public *getSlots() {
    if (this.privSlots === undefined) {
      this.privSlots = Array.from(this.buildSlots());
    }

    yield* this.privSlots;
  }

  protected *buildSlots() {
    const otherwise = this.otherwise;
    if (otherwise !== undefined) {
      yield new Slot(otherwise.node, (value) => otherwise.node = value);
    }
  }
}
