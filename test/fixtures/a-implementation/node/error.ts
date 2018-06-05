import { node } from '../../../../src/frontend';
import { Node } from './base';

class ErrorNode extends Node<node.Error> {
  protected doBuild(out: string[]): void {
    out.push(this.format(`code=${this.ref.code} reason="${this.ref.reason}"`));
  }
}

export { ErrorNode as Error };
