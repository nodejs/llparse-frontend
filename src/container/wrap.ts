import * as assert from 'assert';

import { IWrap } from '../wrap';

export class ContainerWrap<T> {
  protected readonly map: Map<string, IWrap<T>> = new Map();

  constructor(public readonly ref: T) {
  }

  public get<R extends IWrap<T>>(key: string): R {
    assert(this.map.has(key), `Unknown implementation key "${key}"`);
    return this.map.get(key)! as R;
  }
}
