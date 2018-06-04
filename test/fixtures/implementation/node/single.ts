import { node } from '../../../../src/frontend';
import { Implementation } from '../base';

export class Single extends Implementation<node.Single<Single>> {
  public build(): string {
    return '';
  }
}
