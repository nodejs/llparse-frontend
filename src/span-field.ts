import { Span } from './code';

export class SpanField {
  constructor(public readonly index: number,
              public readonly callbacks: ReadonlyArray<Span>) {
  }
}
