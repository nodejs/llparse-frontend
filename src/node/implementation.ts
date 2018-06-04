import { Buffer } from 'buffer';

import { Code, Span } from '../code';
import { Implementation } from '../implementation';
import { SpanField } from '../span-field';
import { IUniqueName } from '../utils';

import { Node } from './base';
import { Consume } from './consume';
import { Empty } from './empty';
import { Error as ErrorNode } from './error';
import { Invoke } from './invoke';
import { Pause } from './pause';
import { Sequence } from './sequence';
import { Single } from './single';
import { SpanEnd } from './span-end';
import { SpanStart } from './span-start';
import { TableLookup } from './table-lookup';

export interface INodeImplementation<I extends Implementation<Node<I>>> {
  readonly Consume: new(n: Consume<I>) => I;
  readonly Empty: new(n: Empty<I>) => I;
  readonly Error: new(n: ErrorNode<I>) => I;
  readonly Invoke: new(n: Invoke<I>) => I;
  readonly Pause: new(n: Pause<I>) => I;
  readonly Sequence: new(n: Sequence<I>) => I;
  readonly Single: new(n: Single<I>) => I;
  readonly SpanEnd: new(n: SpanEnd<I>) => I;
  readonly SpanStart: new(n: SpanStart<I>) => I;
  readonly TableLookup: new(n: TableLookup<I>) => I;
}
