import { Buffer } from 'buffer';

import { Code, Span } from '../code';
import { SpanField } from '../span-field';
import { IUniqueName } from '../utils';

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

export interface INodeImplementation {
  readonly Consume: new(id: IUniqueName, field: string) => Consume;
  readonly Empty: new(id: IUniqueName) => Empty;
  readonly Error: new(id: IUniqueName, code: number,
                      reason: string) => ErrorNode;
  readonly Invoke: new(id: IUniqueName, code: Code) => Invoke;
  readonly Pause: new(id: IUniqueName, code: number,
                      reason: string) => Pause;
  readonly Sequence: new(id: IUniqueName, select: Buffer) => Sequence;
  readonly Single: new(id: IUniqueName) => Single;
  readonly SpanEnd: new(id: IUniqueName, field: SpanField,
                        callback: Span) => SpanEnd;
  readonly SpanStart: new(id: IUniqueName, field: SpanField,
                          callback: Span) => SpanStart;
  readonly TableLookup: new(id: IUniqueName) => TableLookup;
}
