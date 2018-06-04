import { Code } from '../code';
import { IUniqueName } from '../utils';
import { Node } from './base';

export interface IInvokeEdge {
  readonly code: number;
  readonly node: Node;
}

export class Invoke extends Node {
  public readonly edges: IInvokeEdge[] = [];

  constructor(id: IUniqueName, public readonly code: Code) {
    super(id);
  }

  public addEdge(code: number, node: Node): void {
    this.edges.push({ code, node });
  }
}
