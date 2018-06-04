import { node } from '../../../../src/frontend';
import { Implementation } from '../base';

export class Invoke extends Implementation<node.Invoke<Invoke>> {
  public build(): string {
    return '';
  }
}
