import * as assert from 'assert';

import { Builder } from 'llparse-builder';

import { Frontend, node } from '../src/frontend';

describe('llparse-frontend', () => {
  let b: Builder;
  let f: Frontend;
  beforeEach(() => {
    b = new Builder();
    f = new Frontend('llparse');
  });

  it('should translate nodes to implementation', () => {
    const root = b.node('root');

    root.match('ab', root);
    root.match('acd', root);
    root.match('efg', root);
    root.otherwise(b.error(123, 'hello'));

    const fRoot = f.build(root);
    assert(fRoot instanceof node.Single);
  });
});
