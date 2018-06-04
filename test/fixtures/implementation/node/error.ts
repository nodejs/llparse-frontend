import { node } from '../../../../src/frontend';

class ErrorNode extends node.Error {
  public build(ctx: string[]): string {
    return '';
  }
}

export { ErrorNode as Error };
