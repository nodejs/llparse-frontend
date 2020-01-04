import { IUniqueName } from '../utils';
import { Node } from './base';

export class Int extends Node {
  constructor(id: IUniqueName, readonly field: string, public readonly bytes: number, public readonly signed: boolean, public readonly littleEndian: boolean, public readonly byteOffset: number) {
    super(id);
  }
}
