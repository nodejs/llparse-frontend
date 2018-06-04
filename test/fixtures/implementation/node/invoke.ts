import { node } from '../../../../src/frontend';
import { Implementation } from '../base';
import { Base } from './base';

export class Invoke extends Implementation<node.Invoke<Base>> {
  public build(): string {
    return '';
  }
}
