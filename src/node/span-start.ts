import { Span } from '../code';
import { Implementation } from '../implementation';
import { SpanField } from '../span-field';
import { IUniqueName } from '../utils';
import { Node } from './base';

export class SpanStart<I extends Implementation<Node<I>>> extends Node<I> {
  constructor(id: IUniqueName, public readonly field: SpanField,
              public readonly callback: Span) {
    super(id);
  }
}
