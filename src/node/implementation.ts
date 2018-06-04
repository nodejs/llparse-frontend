import { Consume } from './consume';
import { Empty } from './empty';
import { Error as ErrorNode } from './error';
import { Invoke } from './invoke';
import { Match } from './match';
import { Pause } from './pause';
import { Sequence } from './sequence';
import { Single } from './single';
import { SpanEnd } from './span-end';
import { SpanStart } from './span-start';
import { TableLookup } from './table-lookup';

export interface INodeImplementation {
  readonly consume: new() => Consume;
  readonly empty: new() => Empty;
  readonly error: new() => ErrorNode;
  readonly invoke: new() => Invoke;
  readonly match: new() => Match;
  readonly pause: new() => Pause;
  readonly sequence: new() => Sequence;
  readonly single: new() => Single;
  readonly spanEnd: new() => SpanEnd;
  readonly spanStart: new() => SpanStart;
  readonly tableLookup: new() => TableLookup;
}
