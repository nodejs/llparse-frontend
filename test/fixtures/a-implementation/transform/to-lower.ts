import { transform } from '../../../../src/frontend';
import { Transform } from './base';

export class ToLower extends Transform<transform.ToLower> {
  public build(): string {
    return '';
  }
}
