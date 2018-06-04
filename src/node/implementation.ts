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
  readonly consume: new(id: IUniqueName, field: string) => Consume;
  readonly empty: new(id: IUniqueName) => Empty;
  readonly error: new(id: IUniqueName, code: number,
                      reason: string) => ErrorNode;
  readonly invoke: new(id: IUniqueName, code: Code) => Invoke;
  readonly pause: new(id: IUniqueName, code: number,
                      reason: string) => Pause;
  readonly sequence: new(id: IUniqueName, select: Buffer) => Sequence;
  readonly single: new(id: IUniqueName) => Single;
  readonly spanEnd: new(id: IUniqueName, field: SpanField,
                        callback: Span) => SpanEnd;
  readonly spanStart: new(id: IUniqueName, field: SpanField,
                          callback: Span) => SpanStart;
  readonly tableLookup: new(id: IUniqueName) => TableLookup;
}
