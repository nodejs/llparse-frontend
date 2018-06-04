import { node } from '../../../../src/frontend';
import { Implementation } from '../base';
import { Base } from './base';

export class Empty extends Implementation<node.Empty<Base>> {
  public build(): string {
    return '';
  }
}
