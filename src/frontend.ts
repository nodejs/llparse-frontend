import * as assert from 'assert';
import { SpanAllocator } from 'llparse-builder';

import * as frontend from './namespace/frontend';
import * as source from './namespace/source';
import { SpanField } from './span-field';
import { Identifier } from './utils';

export {
  SpanField,
};

export interface IImplementations {
  readonly code: frontend.code.ICodeImplementation;
  readonly node: frontend.node.INodeImplementation;
  readonly transform: frontend.transform.ITransformImplementation;
}

export interface IFrontendOptions {
  readonly maxTableElemWidth: number;
  readonly minTableSize: number;
}

export class Frontend {
  private readonly id: Identifier = new Identifier(this.prefix + '__n_');
  private readonly codeId: Identifier = new Identifier(this.prefix + '__c_');
  private readonly map: Map<source.node.Node, frontend.node.Node> = new Map();
  private readonly spanMap: Map<source.Span, SpanField> = new Map();
  private readonly codeCache: Map<string, frontend.code.Code> = new Map();

  constructor(private readonly prefix: string,
              private readonly implementations: IImplementations,
              private readonly options: IFrontendOptions) {
    assert(0 < options.maxTableElemWidth,
      'Invalid `options.maxTableElemWidth`, must be positive');
  }

  public build(root: source.node.Node): frontend.node.Node {
    const spanAllocator = new SpanAllocator();
    const sourceSpans = spanAllocator.allocate(root);

    const spans = sourceSpans.concurrency.map((concurrent, index) => {
      const span = new SpanField(index, concurrent.map((sourceSpan) => {
        return this.translateCode(sourceSpan.callback) as frontend.code.Span;
      }));

      for (const sourceSpan of concurrent) {
        this.spanMap.set(sourceSpan, span);
      }

      return span;
    });

    return new this.implementations.node.empty({ name: '', originalName: '' });
  }

  private translate(node: source.node.Node): frontend.node.Node {
    return new this.implementations.node.empty({ name: '', originalName: '' });
  }

  private translateCode(code: source.code.Code): frontend.code.Code {
    return new this.implementations.code.match('todo');
  }
}
