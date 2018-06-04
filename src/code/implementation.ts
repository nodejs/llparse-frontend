import { IsEqual } from './is-equal';
import { Load } from './load';
import { Match } from './match';
import { IMulAddOptions, MulAdd } from './mul-add';
import { Or } from './or';
import { Span } from './span';
import { Store } from './store';
import { Test } from './test';
import { Update } from './update';
import { Value } from './value';

export interface ICodeImplementation {
  readonly IsEqual: new(name: string, field: string, value: number) => IsEqual;
  readonly Load: new(name: string, field: string) => Load;
  readonly Match: new(name: string) => Match;
  readonly MulAdd: new(name: string, field: string,
                       options: IMulAddOptions) => MulAdd;
  readonly Or: new(name: string, field: string, value: number) => Or;
  readonly Span: new(name: string) => Span;
  readonly Store: new(name: string, field: string) => Store;
  readonly Test: new(name: string, field: string, value: number) => Test;
  readonly Update: new(name: string, field: string, value: number) => Update;
  readonly Value: new(name: string) => Value;
}
