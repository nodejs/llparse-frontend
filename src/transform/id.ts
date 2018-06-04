import { Transform } from './base';

export class ID extends Transform {
  constructor() {
    super('id');
  }

  public build<Context, Value>(ctx: Context, value: Value): Value {
    // Identity transformation
    return value;
  }
}
