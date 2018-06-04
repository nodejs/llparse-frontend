import { IUniqueName } from '../utils';

export interface IOtherwiseEdge {
  readonly node: Node;
  readonly noAdvance: boolean;
}

export abstract class Node {
  protected otherwise: IOtherwiseEdge | undefined;

  constructor(public readonly id: IUniqueName) {
  }

  public setOtherwise(node: Node, noAdvance: boolean) {
    this.otherwise = { node, noAdvance };
  }
}
