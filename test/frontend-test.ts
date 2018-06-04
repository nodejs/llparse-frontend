import { Builder } from 'llparse-builder';

import { Frontend } from '../src/frontend';

describe('llparse-frontend', () => {
  let b: Builder;
  let f: Frontend;
  beforeEach(() => {
    b = new Builder();
    f = new Frontend('llparse');
  });

  it('should translate nodes to implementation', () => {
    const root = b.node('root');

    root.skipTo(root);

    const implRoot = f.build(root);
  });
});
