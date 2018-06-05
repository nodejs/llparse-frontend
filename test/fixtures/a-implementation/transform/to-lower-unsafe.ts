import { transform } from '../../../../src/frontend';
import { Transform } from './base';

export class ToLowerUnsafe extends Transform<transform.ToLowerUnsafe> {
  public build(): string {
    return '';
  }
}
