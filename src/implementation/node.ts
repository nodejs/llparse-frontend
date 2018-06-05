import * as node from '../node';
import { IWrap } from '../wrap';

export interface INodeImplementation {
  readonly Consume: new(n: node.Consume) => IWrap<node.Consume>;
  readonly Empty: new(n: node.Empty) => IWrap<node.Empty>;
  readonly Error: new(n: node.Error) => IWrap<node.Error>;
  readonly Invoke: new(n: node.Invoke) => IWrap<node.Invoke>;
  readonly Match: new(n: node.Match) => IWrap<node.Match>;
  readonly Pause: new(n: node.Pause) => IWrap<node.Pause>;
  readonly Sequence: new(n: node.Sequence) => IWrap<node.Sequence>;
  readonly Single: new(n: node.Single) => IWrap<node.Single>;
  readonly SpanEnd: new(n: node.SpanEnd) => IWrap<node.SpanEnd>;
  readonly SpanStart: new(n: node.SpanStart) => IWrap<node.SpanStart>;
  readonly TableLookup: new(n: node.TableLookup) => IWrap<node.TableLookup>;
}
