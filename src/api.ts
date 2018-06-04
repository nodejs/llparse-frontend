import { node as api } from 'llparse-builder';

import * as code from './code';
import * as node from './node';
import * as transform from './transform';

export { code, node, transform }

export interface IImplementations {
  readonly code: code.ICodeImplementation;
  readonly node: node.INodeImplementation;
  readonly transform: transform.ITransformImplementation;
}

export interface IFrontendOptions {
  readonly maxTableElemWidth: number;
  readonly minTableSize: number;
}

export class Frontend {
  constructor(private readonly implementations: IImplementations,
              private readonly options: IFrontendOptions) {
  }

  public build(root: api.Node): node.Node {
    return new this.implementations.node.empty();
  }
}
