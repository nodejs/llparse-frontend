import { node } from '../../../../src/frontend';
import { Implementation } from '../base';

class ErrorNode extends Implementation<node.Error<ErrorNode>> {
  public build(): string {
    return '';
  }
}

export { ErrorNode as Error };
