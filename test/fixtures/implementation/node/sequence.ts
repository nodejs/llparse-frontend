import { node } from '../../../../src/frontend';
import { Implementation } from '../base';
import { Base } from './base';

export class Sequence extends Implementation<node.Sequence<Base>> {
  public build(): string {
    return '';
  }
}
