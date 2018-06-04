import { node } from '../../../../src/frontend';
import { Implementation } from '../base';
import { Base } from './base';

export class Single extends Implementation<node.Single<Base>> {
  public build(): string {
    return '';
  }
}
