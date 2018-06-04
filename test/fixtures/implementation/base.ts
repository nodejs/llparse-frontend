import { Implementation as Base, node } from '../../../src/frontend';

export abstract class Implementation<N extends node.Node<Implementation<N>>>
  extends Base<N> {
  public abstract build(): string;
}
