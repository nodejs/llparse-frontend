import { ID } from './id';
import { ToLowerUnsafe } from './to-lower-unsafe';

export interface ITransformImplementation {
  readonly ID: new() => ID;
  readonly ToLowerUnsafe: new() => ToLowerUnsafe;
}
