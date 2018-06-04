import { IUniqueName } from '../utils';
import { Node } from './base';

export abstract class Error extends Node {
  constructor(id: IUniqueName, protected readonly code: number,
              protected readonly reason: string) {
    super(id);
  }
}
