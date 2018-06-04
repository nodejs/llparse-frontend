import { node, Implementation as Base } from '../../../src/frontend';

export abstract class Implementation<N extends node.Node<Implementation<N>>>
  extends Base<N> {
  public abstract build(): string;
}
