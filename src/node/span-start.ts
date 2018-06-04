import { Node } from './base';
import { IUniqueName } from '../utils';
import { Span } from '../code';
import { SpanField } from '../span-field';

export abstract class SpanStart extends Node {
  constructor(id: IUniqueName, protected readonly field: SpanField,
              protected readonly callback: Span) {
    super(id);
  }
}
