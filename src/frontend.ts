import * as assert from 'assert';
import * as debugAPI from 'debug';
import * as source from 'llparse-builder';

import * as frontend from './namespace/frontend';
import { Container, ContainerWrap } from './container';
import { IImplementation } from './implementation';
import { SpanField } from './span-field';
import { Trie, TrieEmpty, TrieNode, TrieSequence, TrieSingle } from './trie';
import { Identifier, IUniqueName } from './utils';
import { IWrap } from './wrap';
import { Enumerator } from './enumerator';
import { Peephole } from './peephole';

const debug = debugAPI('llparse:translator');

export { code, node, transform } from './namespace/frontend';

export {
  source,
  Identifier,
  IUniqueName,
  IWrap,
  SpanField,
  Container,
  ContainerWrap,
};

// Minimum number of cases of `single` node to make it eligable for
// `TableLookup` optimization
export const DEFAULT_MIN_TABLE_SIZE = 32;

// Maximum width of entry in a table for a `TableLookup` optimization
export const DEFAULT_MAX_TABLE_WIDTH = 4;

export interface IFrontendLazyOptions {
  readonly maxTableElemWidth?: number;
  readonly minTableSize?: number;
}

export interface IFrontendResult {
  readonly prefix: string;
  readonly properties: ReadonlyArray<source.Property>;
  readonly root: IWrap<frontend.node.Node>;
  readonly spans: ReadonlyArray<SpanField>;
}

interface IFrontendOptions {
  readonly maxTableElemWidth: number;
  readonly minTableSize: number;
}

type WrappedNode = IWrap<frontend.node.Node>;
type WrappedCode = IWrap<frontend.code.Code>;

type MatchChildren = WrappedNode[];
type MatchResult = WrappedNode | ReadonlyArray<WrappedNode>;

interface ITableLookupTarget {
  readonly keys: number[];
  readonly noAdvance: boolean;
  readonly trie: TrieEmpty;
}

export class Frontend {
  private readonly options: IFrontendOptions;

  private readonly id: Identifier = new Identifier(this.prefix + '__n_');
  private readonly codeId: Identifier = new Identifier(this.prefix + '__c_');
  private readonly map: Map<source.node.Node, WrappedNode> = new Map();
  private readonly spanMap: Map<source.Span, SpanField> = new Map();
  private readonly codeCache: Map<string, WrappedCode> = new Map();

  constructor(private readonly prefix: string,
              private readonly implementation: IImplementation,
              options: IFrontendLazyOptions = {}) {
    this.options = {
      maxTableElemWidth: options.maxTableElemWidth === undefined ?
        DEFAULT_MAX_TABLE_WIDTH : options.maxTableElemWidth,
      minTableSize: options.minTableSize === undefined ?
        DEFAULT_MIN_TABLE_SIZE : options.minTableSize,
    };

    assert(0 < this.options.maxTableElemWidth,
      'Invalid `options.maxTableElemWidth`, must be positive');
  }

  public compile(root: source.node.Node,
                 properties: ReadonlyArray<source.Property>): IFrontendResult {
    debug('checking loops');
    const lc = new source.LoopChecker();
    lc.check(root);

    debug('allocating spans');
    const spanAllocator = new source.SpanAllocator();
    const sourceSpans = spanAllocator.allocate(root);

    const spans = sourceSpans.concurrency.map((concurrent, index) => {
      const span = new SpanField(index, concurrent.map((sourceSpan) => {
        return this.translateSpanCode(sourceSpan.callback);
      }));

      for (const sourceSpan of concurrent) {
        this.spanMap.set(sourceSpan, span);
      }

      return span;
    });

    debug('translating');
    let out = this.translate(root);

    debug('enumerating');
    const enumerator = new Enumerator();
    const nodes = enumerator.getAllNodes(out);

    debug('peephole optimization');
    const peephole = new Peephole();
    out = peephole.optimize(out, nodes);

    return { prefix: this.prefix, properties, spans, root: out };
  }

  private translate(node: source.node.Node): WrappedNode {
    if (this.map.has(node)) {
      return this.map.get(node)!;
    }

    const id = () => this.id.id(node.name);

    const nodeImpl = this.implementation.node;

    // Instantiate target class
    let result: MatchResult;
    if (node instanceof source.node.Error) {
      result = new nodeImpl.Error(
        new frontend.node.Error(id(), node.code, node.reason));
    } else if (node instanceof source.node.Pause) {
      result = new nodeImpl.Pause(
        new frontend.node.Pause(id(), node.code, node.reason));
    } else if (node instanceof source.node.Consume) {
      result = new nodeImpl.Consume(
        new frontend.node.Consume(id(), node.field));
    } else if (node instanceof source.node.SpanStart) {
      result = new nodeImpl.SpanStart(
        new frontend.node.SpanStart(id(), this.spanMap.get(node.span)!,
          this.translateSpanCode(node.span.callback)));
    } else if (node instanceof source.node.SpanEnd) {
      result = new nodeImpl.SpanEnd(
        new frontend.node.SpanEnd(id(), this.spanMap.get(node.span)!,
          this.translateSpanCode(node.span.callback)));
    } else if (node instanceof source.node.Invoke) {
      assert(node.code.signature === 'match' || node.code.signature === 'value',
          'Passing `span` callback to `invoke` is not allowed');
      result = new nodeImpl.Invoke(
        new frontend.node.Invoke(id(), this.translateCode(node.code)));
    } else if (node instanceof source.node.Match) {
      result = this.translateMatch(node);
    } else {
      throw new Error(`Unknown node type for "${node.name}" ${node.constructor.toString()}`);
    }

    // Initialize result
    const otherwise = node.getOtherwiseEdge();

    if (Array.isArray(result)) {
      assert(node instanceof source.node.Match);
      const match = node as source.node.Match;

      // TODO(indutny): move this to llparse-builder?
      assert.notStrictEqual(otherwise, undefined,
        `Node "${node.name}" has no \`.otherwise()\``);

      // Assign otherwise to every node of Trie
      if (otherwise !== undefined) {
        for (const child of result) {
          child.ref.setOtherwise(this.translate(otherwise.node),
            otherwise.noAdvance);
        }
      }

      // Assign transform to every node of Trie
      const transform = this.translateTransform(match.getTransform());
      for (const child of result) {
        child.ref.setTransform(transform);
      }

      assert(result.length >= 1);
      return result[0];
    } else {
      const single = result as WrappedNode;
      assert(single.ref instanceof frontend.node.Node);

      // Break loops
      this.map.set(node, single);

      if (otherwise !== undefined) {
        single.ref.setOtherwise(this.translate(otherwise.node),
          otherwise.noAdvance);
      } else {
        // TODO(indutny): move this to llparse-builder?
        assert(node instanceof source.node.Error,
          `Node "${node.name}" has no \`.otherwise()\``);
      }

      if (single.ref instanceof frontend.node.Invoke) {
        for (const edge of node) {
          single.ref.addEdge(edge.key as number, this.translate(edge.node));
        }
      } else {
        assert.strictEqual(Array.from(node).length, 0);
      }

      return single;
    }
  }

  private translateMatch(node: source.node.Match): MatchResult {
    const trie = new Trie(node.name);

    const otherwise = node.getOtherwiseEdge();
    const trieNode = trie.build(Array.from(node));
    if (trieNode === undefined) {
      return new this.implementation.node.Empty(
        new frontend.node.Empty(this.id.id(node.name)));
    }

    const children: MatchChildren = [];
    this.translateTrie(node, trieNode, children);
    assert(children.length >= 1);

    return children;
  }

  private translateTrie(node: source.node.Match, trie: TrieNode,
                        children: MatchChildren): WrappedNode {
    if (trie instanceof TrieEmpty) {
      assert(this.map.has(node));
      return this.translate(trie.node);
    } else if (trie instanceof TrieSingle) {
      return this.translateSingle(node, trie, children);
    } else if (trie instanceof TrieSequence) {
      return this.translateSequence(node, trie, children);
    } else {
      throw new Error('Unknown trie node');
    }
  }

  private translateSingle(node: source.node.Match, trie: TrieSingle,
                          children: MatchChildren)
    : IWrap<frontend.node.Match> {
    // See if we can apply TableLookup optimization
    const maybeTable = this.maybeTableLookup(node, trie, children);
    if (maybeTable !== undefined) {
      return maybeTable;
    }

    const single = new this.implementation.node.Single(
        new frontend.node.Single(this.id.id(node.name)));
    children.push(single);

    // Break the loop
    if (!this.map.has(node)) {
      this.map.set(node, single);
    }
    for (const child of trie.children) {
      const childNode = this.translateTrie(node, child.node, children);

      single.ref.addEdge({
        key: child.key,
        noAdvance: child.noAdvance,
        node: childNode,
        value: child.node instanceof TrieEmpty ? child.node.value : undefined,
      });
    }
    return single;
  }

  private maybeTableLookup(node: source.node.Match, trie: TrieSingle,
                           children: MatchChildren)
    : IWrap<frontend.node.Match> | undefined {
    if (trie.children.length < this.options.minTableSize) {
      debug('not enough children of "%s" to allocate table, got %d need %d',
        node.name, trie.children.length, this.options.minTableSize);
      return undefined;
    }

    const targets: Map<source.node.Node, ITableLookupTarget> = new Map();

    const bailout = !trie.children.every((child) => {
      if (!(child.node instanceof TrieEmpty)) {
        debug('non-leaf trie child of "%s" prevents table allocation',
          node.name);
        return false;
      }

      const empty: TrieEmpty = child.node;

      // We can't pass values from the table yet
      if (empty.value !== undefined) {
        debug('value passing trie leaf of "%s" prevents table allocation',
          node.name);
        return false;
      }

      const target = empty.node;
      if (!targets.has(target)) {
        targets.set(target, {
          keys: [ child.key ],
          noAdvance: child.noAdvance,
          trie: empty,
        });
        return true;
      }

      const existing = targets.get(target)!;

      // TODO(indutny): just use it as a sub-key?
      if (existing.noAdvance !== child.noAdvance) {
        debug(
          'noAdvance mismatch in a trie leaf of "%s" prevents ' +
            'table allocation',
          node.name);
        return false;
      }

      existing.keys.push(child.key);
      return true;
    });

    if (bailout) {
      return undefined;
    }

    // We've width limit for this optimization
    if (targets.size >= (1 << this.options.maxTableElemWidth)) {
      debug('too many different trie targets of "%s" for a table allocation',
        node.name);
      return undefined;
    }

    const table = new this.implementation.node.TableLookup(
        new frontend.node.TableLookup(this.id.id(node.name)));
    children.push(table);

    // Break the loop
    if (!this.map.has(node)) {
      this.map.set(node, table);
    }

    targets.forEach((target) => {
      const next = this.translateTrie(node, target.trie, children);

      table.ref.addEdge({
        keys: target.keys,
        noAdvance: target.noAdvance,
        node: next,
      });
    });

    debug('optimized "%s" to a table lookup node', node.name);
    return table;
  }

  private translateSequence(node: source.node.Match, trie: TrieSequence,
                            children: MatchChildren)
    : IWrap<frontend.node.Match> {
    const sequence = new this.implementation.node.Sequence(
        new frontend.node.Sequence(this.id.id(node.name), trie.select));
    children.push(sequence);

    // Break the loop
    if (!this.map.has(node)) {
      this.map.set(node, sequence);
    }

    const childNode = this.translateTrie(node, trie.child, children);

    const value = trie.child instanceof TrieEmpty ?
      trie.child.value : undefined;

    sequence.ref.setEdge(childNode, value);

    return sequence;
  }

  private translateCode(code: source.code.Code): WrappedCode {
    const prefixed = this.codeId.id(code.name).name;
    const codeImpl = this.implementation.code;

    let res: WrappedCode;
    if (code instanceof source.code.IsEqual) {
      res = new codeImpl.IsEqual(
        new frontend.code.IsEqual(prefixed, code.field, code.value));
    } else if (code instanceof source.code.Load) {
      res = new codeImpl.Load(
        new frontend.code.Load(prefixed, code.field));
    } else if (code instanceof source.code.MulAdd) {
      const m = new frontend.code.MulAdd(prefixed, code.field, {
        base: code.options.base,
        max: code.options.max,
        signed: code.options.signed === undefined ? true : code.options.signed,
      });
      res = new codeImpl.MulAdd(m);
    } else if (code instanceof source.code.Or) {
      res = new codeImpl.Or(
        new frontend.code.Or(prefixed, code.field, code.value));
    } else if (code instanceof source.code.Store) {
      res = new codeImpl.Store(
        new frontend.code.Store(prefixed, code.field));
    } else if (code instanceof source.code.Test) {
      res = new codeImpl.Test(
        new frontend.code.Test(prefixed, code.field, code.value));
    } else if (code instanceof source.code.Update) {
      res = new codeImpl.Update(
        new frontend.code.Update(prefixed, code.field, code.value));

    // External callbacks
    } else if (code instanceof source.code.Match) {
      res = new codeImpl.Match(new frontend.code.Match(code.name));
    } else if (code instanceof source.code.Span) {
      res = new codeImpl.Span(new frontend.code.Span(code.name));
    } else if (code instanceof source.code.Value) {
      res = new codeImpl.Value(new frontend.code.Value(code.name));
    } else {
      throw new Error(`Unsupported code: "${code.name}"`);
    }

    // Re-use instances to build them just once
    if (this.codeCache.has(res.ref.cacheKey)) {
      return this.codeCache.get(res.ref.cacheKey)!;
    }

    this.codeCache.set(res.ref.cacheKey, res);
    return res;
  }

  private translateSpanCode(code: source.code.Span): IWrap<frontend.code.Span> {
    return this.translateCode(code) as IWrap<frontend.code.Span>;
  }

  private translateTransform(transform?: source.transform.Transform)
    : IWrap<frontend.transform.Transform> {
    const transformImpl = this.implementation.transform;
    if (transform === undefined) {
      return new transformImpl.ID(new frontend.transform.ID());
    } else if (transform.name === 'to_lower_unsafe') {
      return new transformImpl.ToLowerUnsafe(
        new frontend.transform.ToLowerUnsafe());
    } else {
      throw new Error(`Unsupported transform: "${transform.name}"`);
    }
  }
}
