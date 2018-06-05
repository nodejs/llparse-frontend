import { node } from '../../../../src/frontend';
import { Node } from './base';

class ErrorNode extends Node<node.Error> {
  public build(): string {
    return '';
  }
}

export { ErrorNode as Error };
