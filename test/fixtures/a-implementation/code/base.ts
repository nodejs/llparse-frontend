export abstract class Code<T> {
  constructor(public readonly ref: T) {
  }

  public abstract build(): string;
}
