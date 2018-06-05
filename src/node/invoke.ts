import { Code } from '../code';
import { IUniqueName } from '../utils';
import { IWrap } from '../wrap';
import { Node } from './base';
import { Slot } from './slot';

interface IInvokeEdge {
  readonly code: number;
  node: IWrap<Node>;
}

export interface IReadonlyInvokeEdge {
  readonly code: number;
  readonly node: IWrap<Node>;
}

export class Invoke extends Node {
  private readonly privEdges: IInvokeEdge[] = [];

  constructor(id: IUniqueName, public readonly code: IWrap<Code>) {
    super(id);
  }

  public addEdge(code: number, node: IWrap<Node>): void {
    this.privEdges.push({ code, node });
  }

  public get edges(): ReadonlyArray<IReadonlyInvokeEdge> {
    return this.privEdges;
  }

  protected *buildSlots() {
    for (const edge of this.privEdges) {
      yield new Slot(edge.node, (value) => edge.node = value);
    }

    yield* super.buildSlots();
  }
}
