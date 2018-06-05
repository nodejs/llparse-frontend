import { CombinatorWrap, node } from '../../../../src/frontend';

export abstract class Node<T extends node.Node> {
  private built: boolean = false;

  constructor(public readonly ref: T) {
  }

  public build(out: string[]): void {
    if (this.built) {
      return;
    }

    this.built = true;
    this.doBuild(out);

    if (this.ref.otherwise !== undefined) {
      const cwrap = this.ref.otherwise.node as CombinatorWrap<T>;
      const otherwise = cwrap.get<Node<T>>('a');
      otherwise.build(out);
    }
  }

  protected format(value: string): string {
    let otherwise: string = '';
    if (this.ref.otherwise !== undefined) {
      const otherwiseRef = this.ref.otherwise.node.ref;
      otherwise = ' otherwise' +
        `${this.ref.otherwise.noAdvance ? '-no_adv' : ''}=` +
        `${otherwiseRef.id.name}`;
    }

    return `<${this.constructor.name} name=${this.ref.id.name} ` +
      `${value}${otherwise}/>`;
  }

  protected abstract doBuild(out: string[]): void;
}
