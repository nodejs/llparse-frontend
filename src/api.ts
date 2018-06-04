import { node as api } from 'llparse-builder';

import * as code from './code';
import * as node from './node';

export { code, node }

export interface IFrontendOptions {
  readonly maxTableElemWidth: number;
  readonly minTableSize: number;

  // Implementations
  readonly code: code.ICodeImplementation;
  readonly node: node.INodeImplementation;
}

export class Frontend {
  constructor(private readonly options: IFrontendOptions) {
  }

  public build(root: api.Node): node.Node {
    return new this.options.node.empty();
  }
}
