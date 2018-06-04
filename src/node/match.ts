import { Transform } from '../transform';
import { Node } from './base';

export class Match extends Node {
  public transform?: Transform;

  public setTransform(transform: Transform): void {
    this.transform = transform;
  }
}
