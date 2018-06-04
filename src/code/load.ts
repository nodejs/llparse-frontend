import { Field } from './field';

export abstract class Load extends Field {
  constructor(name: string, field: string) {
    super('match', `load_${field}`, name, field);
  }
}
