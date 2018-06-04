import { IUniqueName } from '../utils';
import { Node } from './base';

export abstract class Consume extends Node {
  constructor(id: IUniqueName, protected readonly field: string) {
    super(id);
  }
}
