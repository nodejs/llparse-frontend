import { Node } from './base';
import { IUniqueName } from '../utils';

export abstract class Consume extends Node {
  constructor(id: IUniqueName, protected readonly field: string) {
    super(id);
  }
}
