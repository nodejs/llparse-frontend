import { transform } from '../../../../src/frontend';

export class ID extends transform.ID {
  public build(ctx: string[], value: string): string {
    return '';
  }
}
