import { node } from '../../../../src/frontend';
import { Implementation } from '../base';
import { Base } from './base';

export class Consume extends Implementation<node.Consume<Base>> {
  public build(): string {
    return '';
  }
}
