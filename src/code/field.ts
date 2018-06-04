import { Code, Signature } from './base';

export abstract class Field extends Code {
  constructor(signature: Signature, cacheKey: string, name: string,
              public readonly field: string) {
    super(signature, cacheKey, name);
  }
}
