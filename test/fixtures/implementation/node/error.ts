import { node } from '../../../../src/frontend';
import { Implementation } from '../base';
import { Base } from './base';

class ErrorNode extends Implementation<node.Error<Base>> {
  public build(): string {
    return '';
  }
}

export { ErrorNode as Error };
