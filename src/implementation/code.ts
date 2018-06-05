import * as code from '../code';
import { IWrap } from '../wrap';

export interface ICodeImplementation {
  readonly IsEqual: new(c: code.IsEqual) => IWrap<code.IsEqual>;
  readonly Load: new(c: code.Load) => IWrap<code.Load>;
  readonly Match: new(c: code.Match) => IWrap<code.Match>;
  readonly MulAdd: new(c: code.MulAdd) => IWrap<code.MulAdd>;
  readonly Or: new(c: code.Or) => IWrap<code.Or>;
  readonly Span: new(c: code.Span) => IWrap<code.Span>;
  readonly Store: new(c: code.Store) => IWrap<code.Store>;
  readonly Test: new(c: code.Test) => IWrap<code.Test>;
  readonly Update: new(c: code.Update) => IWrap<code.Update>;
  readonly Value: new(c: code.Value) => IWrap<code.Value>;
}
