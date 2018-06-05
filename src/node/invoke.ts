import { Code } from '../code';
import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';
import { Slot } from './slot';

export interface IInvokeEdge {
  readonly code: number;
  node: IWrap<Node>;
}

export class Invoke extends Node {
  public readonly edges: IInvokeEdge[] = [];

  constructor(id: IUniqueName, public readonly code: IWrap<Code>) {
    super(id);
  }

  public addEdge(code: number, node: IWrap<Node>): void {
    this.edges.push({ code, node });
  }

  public *getSlots() {
    for (const edge of this.edges) {
      yield new Slot(edge.node, (value) => edge.node = value);
    }

    yield* super.getSlots();
  }
}
