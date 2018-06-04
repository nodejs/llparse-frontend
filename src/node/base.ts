import { Implementation } from '../implementation';
import { IUniqueName } from '../utils';

export interface IOtherwiseEdge<I extends Implementation<Node<I>>> {
  readonly node: I;
  readonly noAdvance: boolean;
}

export abstract class Node<I extends Implementation<Node<I>>> {
  public otherwise: IOtherwiseEdge<I> | undefined;

  constructor(public readonly id: IUniqueName) {
  }

  public setOtherwise(node: I, noAdvance: boolean) {
    this.otherwise = { node, noAdvance };
  }
}
