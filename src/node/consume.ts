import { Implementation } from '../implementation';
import { IUniqueName } from '../utils';
import { Node } from './base';

export class Consume<I extends Implementation<Node<I>>> extends Node<I> {
  constructor(id: IUniqueName, readonly field: string) {
    super(id);
  }
}
