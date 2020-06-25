import * as assert from 'assert';

import * as source from 'llparse-builder';

import { Frontend, node } from '../src/frontend';
import implementation from './fixtures/implementation';
import { Node } from './fixtures/implementation/node/base';

function checkNodes(f: Frontend, root: source.node.Node,
                    expected: ReadonlyArray<string>) {
  const fRoot = f.compile(root, []).root as Node<node.Node>;

  const out: string[] = [];
  fRoot.build(out);

  assert.deepStrictEqual(out, expected);

  return fRoot;
}

function checkResumptionTargets(f: Frontend, expected: ReadonlyArray<string>) {
  const targets = Array.from(f.getResumptionTargets()).map((t) => {
    return t.ref.id.name;
  });

  assert.deepStrictEqual(targets, expected);
}

describe('llparse-frontend', () => {
  let b: source.Builder;
  let f: Frontend;
  beforeEach(() => {
    b = new source.Builder();
    f = new Frontend('llparse', implementation);
  });

  it('should translate nodes to implementation', () => {
    const root = b.node('root');

    root.match('ab', root);
    root.match('acd', root);
    root.match('efg', root);
    root.otherwise(b.error(123, 'hello'));

    checkNodes(f, root, [
      '<Single name=llparse__n_root k97=llparse__n_root_1 ' +
        'k101=llparse__n_root_3 otherwise-no_adv=llparse__n_error/>',
      '<Single name=llparse__n_root_1 k98=llparse__n_root ' +
        'k99=llparse__n_root_2 otherwise-no_adv=llparse__n_error/>',
      '<Single name=llparse__n_root_2 k100=llparse__n_root ' +
        'otherwise-no_adv=llparse__n_error/>',
      '<ErrorNode name=llparse__n_error code=123 reason="hello"/>',
      '<Sequence name=llparse__n_root_3 select="6667" ' +
        'edge=\"llparse__n_root\" ' +
        'otherwise-no_adv=llparse__n_error/>',
    ]);

    checkResumptionTargets(f, [
      'llparse__n_root',
      'llparse__n_root_1',
      'llparse__n_root_3',
      'llparse__n_root_2',
    ]);
  });

  it('should do peephole optimization', () => {
    const root = b.node('root');
    const root1 = b.node('a');
    const root2 = b.node('b');
    const node1 = b.node('c');
    const node2 = b.node('d');

    root.otherwise(root1);
    root1.otherwise(root2);
    root2.skipTo(node1);
    node1.otherwise(node2);
    node2.otherwise(root);

    checkNodes(f, root, [
      '<Empty name=llparse__n_b  otherwise=llparse__n_b/>',
    ]);

    checkResumptionTargets(f, [
      'llparse__n_b',
    ]);
  });

  it('should generate proper resumption targets', () => {
    b.property('i64', 'counter');

    const root = b.node('root');
    const end = b.node('end');
    const store = b.invoke(b.code.store('counter'));

    root.select({ a: 1, b: 2 }, store);
    root.otherwise(b.error(1, 'okay'));

    store.otherwise(end);

    end.match('ohai', root);
    end.match('paus', b.pause(1, 'paused').otherwise(
        b.pause(2, 'paused').otherwise(root)));
    end.otherwise(b.error(2, 'ohai'));

    checkNodes(f, root, [
      '<Single name=llparse__n_root k97=llparse__n_invoke_store_counter ' +
          'k98=llparse__n_invoke_store_counter ' +
          'otherwise-no_adv=llparse__n_error_1/>',
      '<Invoke name=llparse__n_invoke_store_counter  ' +
          'otherwise-no_adv=llparse__n_end/>',
      '<Single name=llparse__n_end k111=llparse__n_end_1 ' +
          'k112=llparse__n_end_2 otherwise-no_adv=llparse__n_error/>',
      '<Sequence name=llparse__n_end_1 select="686169" ' +
          'edge="llparse__n_root" otherwise-no_adv=llparse__n_error/>',
      '<ErrorNode name=llparse__n_error code=2 reason="ohai"/>',
      '<Sequence name=llparse__n_end_2 select="617573" ' +
          'edge="llparse__n_pause" otherwise-no_adv=llparse__n_error/>',
      '<Pause name=llparse__n_pause  otherwise-no_adv=llparse__n_pause_1/>',
      '<Pause name=llparse__n_pause_1  otherwise-no_adv=llparse__n_root/>',
      '<ErrorNode name=llparse__n_error_1 code=1 reason="okay"/>',
    ]);

    checkResumptionTargets(f, [
      'llparse__n_root',
      'llparse__n_end',
      'llparse__n_end_1',
      'llparse__n_end_2',
      'llparse__n_pause_1',
    ]);
  });

  it('should translate Span code into Span', () => {
    const root = b.invoke(b.code.span('my_span'));
    root.otherwise(b.error(1, 'okay'));

    const fRoot = checkNodes(f, root, [
      '<Invoke name=llparse__n_invoke_my_span  ' +
        'otherwise-no_adv=llparse__n_error/>',
      '<ErrorNode name=llparse__n_error code=1 reason="okay"/>',
    ]);

    assert((fRoot.ref as any).code instanceof implementation.code.Span);
  });

  it('should translate overlapping matches', () => {
    const root = b.node('root');

    root.match('ab', root);
    root.match('abc', root);
    root.otherwise(b.error(123, 'hello'));

    checkNodes(f, root, [
      '<Sequence name=llparse__n_root select="6162" edge="llparse__n_root_1" otherwise-no_adv=llparse__n_error/>',
      '<Single name=llparse__n_root_1 k99=llparse__n_root otherwise-no_adv=llparse__n_root/>',
      '<ErrorNode name=llparse__n_error code=123 reason="hello"/>',
    ]);

    checkResumptionTargets(f, [
      'llparse__n_root',
      'llparse__n_root_1',
    ]);
  });
});
