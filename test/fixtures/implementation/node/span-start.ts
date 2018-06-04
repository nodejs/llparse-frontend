import { node } from '../../../../src/frontend';
import { Implementation } from '../base';
import { Base } from './base';

export class SpanStart extends Implementation<node.SpanStart<Base>> {
  public build(): string {
    return '';
  }
}
