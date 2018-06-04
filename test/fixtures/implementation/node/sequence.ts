import { node } from '../../../../src/frontend';
import { Implementation } from '../base';

export class Sequence extends Implementation<node.Sequence<Sequence>> {
  public build(): string {
    return '';
  }
}
