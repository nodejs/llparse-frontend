import { transform } from '../../../../src/frontend';

export class ToLowerUnsafe extends transform.ToLowerUnsafe {
  public build(ctx: string[], value: string): string {
    return '';
  }
}
