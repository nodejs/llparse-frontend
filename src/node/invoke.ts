import { Code } from '../code';
import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';

export interface IInvokeEdge {
  readonly code: number;
  readonly node: IWrap<Node>;
}

export class Invoke extends Node {
  public readonly edges: IInvokeEdge[] = [];

  constructor(id: IUniqueName, public readonly code: IWrap<Code>) {
    super(id);
  }

  public addEdge(code: number, node: IWrap<Node>): void {
    this.edges.push({ code, node });
  }
}
