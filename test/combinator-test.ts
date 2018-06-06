import * as assert from 'assert';

import { Builder } from 'llparse-builder';

import { Container, ContainerWrap, Frontend, node } from '../src/frontend';
import implementation from './fixtures/a-implementation';
import { Node } from './fixtures/implementation/node/base';

describe('llparse-frontend/Container', () => {
  let b: Builder;
  beforeEach(() => {
    b = new Builder();
  });

  it('should translate nodes to implementation', () => {
    const comb = new Container();
    comb.add('a', implementation);
    comb.add('b', implementation);

    const f = new Frontend('llparse', comb.build());

    const root = b.node('root');

    root.match('ab', root);
    root.match('acd', root);
    root.match('efg', root);
    root.otherwise(b.error(123, 'hello'));

    const fRoot = f.compile(root).root as ContainerWrap<node.Node>;

    const out: string[] = [];
    (fRoot.get('a') as Node<node.Node>).build(out);

    assert.deepStrictEqual(out, [
      '<Single name=llparse__n_root k97=llparse__n_root_1 k101=llparse__n_root_3 otherwise-no_adv=llparse__n_error/>',
      '<Single name=llparse__n_root_1 k98=llparse__n_root k99=llparse__n_root_2 otherwise-no_adv=llparse__n_error/>',
      '<Single name=llparse__n_root_2 k100=llparse__n_root otherwise-no_adv=llparse__n_error/>',
      '<ErrorNode name=llparse__n_error code=123 reason="hello"/>',
      '<Sequence name=llparse__n_root_3 select="6667" otherwise-no_adv=llparse__n_error/>',
    ]);
  });
});
