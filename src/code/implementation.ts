import { IsEqual } from './is-equal';
import { Load } from './load';
import { Match } from './match';
import { MulAdd } from './mul-add';
import { Or } from './or';
import { Span } from './span';
import { Store } from './store';
import { Test } from './test';
import { Update } from './update';
import { Value } from './value';

export interface ICodeImplementation {
  readonly isEqual: new() => IsEqual;
  readonly load: new() => Load;
  readonly match: new() => Match;
  readonly mulAdd: new() => MulAdd;
  readonly or: new() => Or;
  readonly span: new() => Span;
  readonly store: new() => Store;
  readonly test: new() => Test;
  readonly update: new() => Update;
  readonly value: new() => Value;
}
