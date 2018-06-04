import { External } from './external';

export abstract class Span extends External {
  constructor(name: string) {
    super('span', name);
  }
}
