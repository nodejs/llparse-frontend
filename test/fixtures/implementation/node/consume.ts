import { node } from '../../../../src/frontend';
import { Implementation } from '../base';

export class Consume extends Implementation<node.Consume<Consume>> {
  public build(): string {
    return '';
  }
}
