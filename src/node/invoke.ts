import { Node } from './base';
import { IUniqueName } from '../utils';
import { Code } from '../code';

export interface IInvokeEdge {
  readonly code: number;
  readonly node: Node;
}

export abstract class Invoke extends Node {
  protected readonly edges: IInvokeEdge[] = [];

  constructor(id: IUniqueName, protected readonly code: Code) {
    super(id);
  }

  public addEdge(code: number, node: Node): void {
    this.edges.push({ code, node });
  }
}
