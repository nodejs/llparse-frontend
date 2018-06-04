import { Node } from './base';

export abstract class SpanStart extends Node {
  constructor(id: IUniqueName, protected readonly field: SpanField,
              protected readonly callback: Span) {
    super(id);
  }
}
