import * as transform from '../transform';
import { IWrap } from '../wrap';

export interface ITransformImplementation {
  readonly ID: new(t: transform.ID) => IWrap<transform.ID>;
  readonly ToLower: new(t: transform.ToLower) => IWrap<transform.ToLower>;
  readonly ToLowerUnsafe: new(t: transform.ToLowerUnsafe)
    => IWrap<transform.ToLowerUnsafe>;
}
