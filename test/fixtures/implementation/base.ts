import { Implementation as BaseImpl, node } from '../../../src/frontend';

export abstract class Implementation<N extends node.Node<Implementation<N>>>
  extends BaseImpl<N> {
  public abstract build(): string;
}
