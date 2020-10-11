import { toCacheKey } from '../utils';
import { FieldValue } from './field-value';

export class And extends FieldValue {
  constructor(name: string, field: string, value: number) {
    super('match', `and_${field}_${toCacheKey(value)}`, name, field, value);
  }
}
