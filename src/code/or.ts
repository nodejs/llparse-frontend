import { toCacheKey } from '../utils';
import { FieldValue } from './field-value';

export abstract class Or extends FieldValue {
  constructor(name: string, field: string, value: number) {
    super('match', `or_${field}_${toCacheKey(value)}`, name, field, value);
  }
}
