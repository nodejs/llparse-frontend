import { Implementation } from '../implementation';
import { Transform } from '../transform';
import { Node } from './base';

export class Match<I extends Implementation<Node<I>>> extends Node<I> {
  public transform?: Transform;

  public setTransform(transform: Transform): void {
    this.transform = transform;
  }
}
