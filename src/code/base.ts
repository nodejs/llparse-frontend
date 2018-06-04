export type Signature = 'match' | 'value' | 'span';

export abstract class Code {
  constructor(public readonly signature: Signature,
              public readonly cacheKey: string,
              public readonly name: string) {
  }
}
