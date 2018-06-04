import { Span } from '../code';
import { SpanField } from '../span-field';
import { IUniqueName } from '../utils';
import { Node } from './base';

export abstract class SpanEnd extends Node {
  constructor(id: IUniqueName, protected readonly field: SpanField,
              protected readonly callback: Span) {
    super(id);
  }
}
