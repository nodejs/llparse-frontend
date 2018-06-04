import { node } from '../../../../src/frontend';
import { Implementation } from '../base';
import { Base } from './base';

export class Pause extends Implementation<node.Pause<Base>> {
  public build(): string {
    return '';
  }
}
