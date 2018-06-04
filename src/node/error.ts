import { IUniqueName } from '../utils';
import { Node } from './base';

export class Error extends Node {
  constructor(id: IUniqueName, public readonly code: number,
              public readonly reason: string) {
    super(id);
  }
}
