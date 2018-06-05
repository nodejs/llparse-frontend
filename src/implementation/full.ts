import { ICodeImplementation } from './code';
import { INodeImplementation } from './node';
import { ITransformImplementation } from './transform';

export interface IImplementation {
  readonly code: ICodeImplementation;
  readonly node: INodeImplementation;
  readonly transform: ITransformImplementation;
}
