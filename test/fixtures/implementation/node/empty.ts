import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Empty extends Node<node.Empty> {
  public build(): string {
    return '';
  }
}
