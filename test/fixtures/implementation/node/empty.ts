import { node } from '../../../../src/frontend';
import { Implementation } from '../base';

export class Empty extends Implementation<node.Empty<Empty>> {
  public build(): string {
    return '';
  }
}
