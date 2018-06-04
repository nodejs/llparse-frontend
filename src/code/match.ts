import { External } from './external';

export abstract class Match extends External {
  constructor(name: string) {
    super('match', name);
  }
}
