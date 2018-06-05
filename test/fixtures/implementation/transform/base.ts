export abstract class Transform<T> {
  constructor(public readonly ref: T) {
  }

  public abstract build(): string;
}
