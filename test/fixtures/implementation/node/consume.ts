import { node } from '../../../../src/frontend';
import { Node } from './base';

export class Consume extends Node<node.Consume> {
  public build(): string {
    return '<Consume>';
  }
}
