import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Slot } from './slot';

export interface IReadonlyOtherwiseEdge {
  readonly node: IWrap<Node>;
  readonly noAdvance: boolean;
  readonly value: number | undefined;
}

interface IOtherwiseEdge {
  node: IWrap<Node>;
  readonly noAdvance: boolean;
  readonly value: number | undefined;
}

export abstract class Node {
  private privOtherwise: IOtherwiseEdge | undefined;
  private privSlots: ReadonlyArray<Slot> | undefined;

  constructor(public readonly id: IUniqueName) {
  }

  public setOtherwise(node: IWrap<Node>, noAdvance: boolean, value?: number) {
    this.privOtherwise = { node, noAdvance, value };
  }

  public get otherwise(): IReadonlyOtherwiseEdge | undefined {
    return this.privOtherwise;
  }

  public *getSlots() {
    if (this.privSlots === undefined) {
      this.privSlots = Array.from(this.buildSlots());
    }

    yield* this.privSlots;
  }

  protected *buildSlots() {
    const otherwise = this.privOtherwise;
    if (otherwise !== undefined) {
      yield new Slot(otherwise.node, (value) => otherwise.node = value);
    }
  }
}
