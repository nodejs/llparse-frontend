import { Transform } from './base';

export abstract class ToLowerUnsafe extends Transform {
  constructor() {
    super('to_lower_unsafe');
  }
}
