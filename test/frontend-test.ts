import { Builder } from 'llparse-builder';

import { Frontend } from '../src/frontend';
import * as implementation from './fixtures/implementation';

describe('llparse-frontend', () => {
let b: Builder;
let f: Frontend;
beforeEach(() => {
    b = new Builder();
    f = new Frontend('llparse', implementation, {
      maxTableElemWidth: 4,
      minTableSize: 32,
    });
  });

it('should translate nodes to implementation', () => {
    const root = b.node('root');

    root.skipTo(root);

    const implRoot = f.build(root);
  });
});
