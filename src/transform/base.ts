export abstract class Transform {
  constructor(public readonly name: string) {
  }

  public abstract build<Context, Value>(ctx: Context, value: Value): Value;
}
