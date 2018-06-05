import { Span } from '../code';
import { SpanField } from '../span-field';
import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';

export class SpanEnd extends Node {
  constructor(id: IUniqueName, public readonly field: SpanField,
              public readonly callback: IWrap<Span>) {
    super(id);
  }
}
