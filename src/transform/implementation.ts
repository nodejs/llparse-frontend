import { ID } from './id';
import { ToLowerUnsafe } from './to-lower-unsafe';

export interface ITransformImplementation {
  readonly id: new() => ID;
  readonly toLowerUnsafe: new() => ToLowerUnsafe;
}
