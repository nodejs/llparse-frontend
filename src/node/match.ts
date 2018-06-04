import { Node } from './base';
import { Transform } from '../transform';

export abstract class Match extends Node {
  protected transform?: Transform;

  public setTransform(transform: Transform): void {
    this.transform = transform;
  }
}
