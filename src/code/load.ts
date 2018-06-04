import { Field } from './field';

export class Load extends Field {
  constructor(name: string, field: string) {
    super('match', `load_${field}`, name, field);
  }
}
