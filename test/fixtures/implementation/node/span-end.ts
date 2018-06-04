import { node } from '../../../../src/frontend';
import { Implementation } from '../base';
import { Base } from './base';

export class SpanEnd extends Implementation<node.SpanEnd<Base>> {
  public build(): string {
    return '';
  }
}
