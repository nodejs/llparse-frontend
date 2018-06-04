import { Code, Signature } from './base';

export abstract class External extends Code {
  constructor(signature: Signature, name: string) {
    super(signature, 'external_' + name, name);
  }
}
