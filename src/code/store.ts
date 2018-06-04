import { Field } from './field';

export abstract class Store extends Field {
  constructor(name: string, field: string) {
    super('value', `store_${field}`, name, field);
  }
}
