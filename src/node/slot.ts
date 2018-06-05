import { IWrap } from '../wrap';
import { Node } from './base';

export class Slot {
  private privNode: IWrap<Node>;

  constructor(node: IWrap<Node>,
              private readonly privUpdate: (value: IWrap<Node>) => void) {
    this.privNode = node;
  }

  public get node(): IWrap<Node> {
    return this.privNode;
  }

  public set node(value: IWrap<Node>) {
    this.privNode = value;
    this.privUpdate(value);
  }
}
