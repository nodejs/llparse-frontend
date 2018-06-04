import { Node } from './base';
import { IUniqueName } from '../utils';

export abstract class Error extends Node {
  constructor(id: IUniqueName, protected readonly code: number,
              protected readonly reason: string) {
    super(id);
  }
}
