import { External } from './external';

export abstract class Value extends External {
  constructor(name: string) {
    super('value', name);
  }
}
