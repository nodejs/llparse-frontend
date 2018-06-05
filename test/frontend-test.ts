import * as assert from 'assert';

import { Builder } from 'llparse-builder';

import { Frontend, node } from '../src/frontend';
import implementation from './fixtures/implementation';
import { Node } from './fixtures/implementation/node/base';

describe('llparse-frontend', () => {
  let b: Builder;
  let f: Frontend;
  beforeEach(() => {
    b = new Builder();
    f = new Frontend('llparse', implementation);
  });

  it('should translate nodes to implementation', () => {
    const root = b.node('root');

    root.match('ab', root);
    root.match('acd', root);
    root.match('efg', root);
    root.otherwise(b.error(123, 'hello'));

    const fRoot = f.build(root) as Node<node.Node>;

    const out: string[] = [];
    fRoot.build(out);

    assert.deepStrictEqual(out, [
      '<Single name=llparse__n_root k97=llparse__n_root_1 k101=llparse__n_root_3 otherwise-no_adv=llparse__n_error/>',
      '<Single name=llparse__n_root_1 k98=llparse__n_root k99=llparse__n_root_2 otherwise-no_adv=llparse__n_error/>',
      '<Single name=llparse__n_root_2 k100=llparse__n_root otherwise-no_adv=llparse__n_error/>',
      '<ErrorNode name=llparse__n_error code=123 reason="hello"/>',
      '<Sequence name=llparse__n_root_3 select="6667" otherwise-no_adv=llparse__n_error/>',
    ]);
  });
});
