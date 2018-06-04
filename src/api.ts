import { node as api } from 'llparse-builder';
import { Node, INodeImplementation } from './node';

export interface IFrontendOptions {
  readonly maxTableElemWidth: number;
  readonly minTableSize: number;

  // Implementations
  readonly node: INodeImplementation;
}

export class Frontend {
  constructor(private readonly options: IFrontendOptions) {
  }

  public build(root: api.Node): Node {
    return new this.options.node.empty();
  }
}
