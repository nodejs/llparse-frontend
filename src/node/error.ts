import { Implementation } from '../implementation';
import { IUniqueName } from '../utils';
import { Node } from './base';

export class Error<I extends Implementation<Node<I>>> extends Node<I> {
  constructor(id: IUniqueName, public readonly code: number,
              public readonly reason: string) {
    super(id);
  }
}
