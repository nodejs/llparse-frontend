import { transform } from '../../../../src/frontend';
import { Transform } from './base';

export class ID extends Transform<transform.ID> {
  public build(): string {
    return '';
  }
}
