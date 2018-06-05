import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';

export interface IOtherwiseEdge {
  readonly node: IWrap<Node>;
  readonly noAdvance: boolean;
}

export abstract class Node {
  public otherwise: IOtherwiseEdge | undefined;

  constructor(public readonly id: IUniqueName) {
  }

  public setOtherwise(node: IWrap<Node>, noAdvance: boolean) {
    this.otherwise = { node, noAdvance };
  }
}
