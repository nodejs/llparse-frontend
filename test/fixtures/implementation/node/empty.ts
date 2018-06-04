import { node } from '../../../../src/frontend';

export class Empty extends node.Empty {
  public build(ctx: string[]): string {
    return '';
  }
}
