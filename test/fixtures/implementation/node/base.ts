export abstract class Node<T> {
  constructor(public readonly ref: T) {
  }

  public abstract build(): string;
}
