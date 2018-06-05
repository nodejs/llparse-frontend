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
    const out = fRoot.build();

    // TODO(indutny): write better tests
    assert.equal(out, '<Single 97 101/>');
  });
});
