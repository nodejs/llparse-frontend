import { toCacheKey } from '../utils';
import { FieldValue } from './field-value';

export abstract class Test extends FieldValue {
  constructor(name: string, field: string, value: number) {
    super('match', `test_${field}_${toCacheKey(value)}`, name, field, value);
  }
}
