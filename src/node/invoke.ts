import { Code } from '../code';
import { Implementation } from '../implementation';
import { IUniqueName } from '../utils';
import { Node } from './base';

export interface IInvokeEdge<I extends Implementation<Node<I>>> {
  readonly code: number;
  readonly node: I;
}

export class Invoke<I extends Implementation<Node<I>>> extends Node<I> {
  public readonly edges: Array<IInvokeEdge<I>> = [];

  constructor(id: IUniqueName, public readonly code: Code) {
    super(id);
  }

  public addEdge(code: number, node: I): void {
    this.edges.push({ code, node });
  }
}
