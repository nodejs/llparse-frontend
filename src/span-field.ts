import { Span } from './code';
import { IWrap } from './wrap';

export class SpanField {
  constructor(public readonly index: number,
              public readonly callbacks: ReadonlyArray<IWrap<Span>>) {
  }
}
