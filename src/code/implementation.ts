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
  readonly isEqual: new(name: string, field: string, value: number) => IsEqual;
  readonly load: new(name: string, field: string) => Load;
  readonly match: new(name: string) => Match;
  readonly mulAdd: new(name: string, field: string,
                       options: IMulAddOptions) => MulAdd;
  readonly or: new(name: string, field: string, value: number) => Or;
  readonly span: new(name: string) => Span;
  readonly store: new(name: string, field: string) => Store;
  readonly test: new(name: string, field: string, value: number) => Test;
  readonly update: new(name: string, field: string, value: number) => Update;
  readonly value: new(name: string) => Value;
}
