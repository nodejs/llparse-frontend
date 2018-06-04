import { Builder } from 'llparse-builder';

import { Frontend, node } from '../src/frontend';
import * as implementation from './fixtures/implementation';

describe('llparse-frontend', () => {
  let b: Builder;
  beforeEach(() => {
    b = new Builder();
  });

  it('should translate nodes to implementation', () => {
    const root = b.node('root');

    root.skipTo(root);

    const f = new Frontend('llparse', implementation, {
      maxTableElemWidth: 4,
      minTableSize: 32,
    });

    const implRoot = f.build(root);
  });
});
