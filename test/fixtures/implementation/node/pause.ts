import { node } from '../../../../src/frontend';
import { Implementation } from '../base';

export class Pause extends Implementation<node.Pause<Pause>> {
  public build(): string {
    return '';
  }
}
