import { Transform } from '../transform';
import { IWrap } from '../wrap';
import { Node } from './base';

export class Match extends Node {
  public transform?: IWrap<Transform>;

  public setTransform(transform: IWrap<Transform>): void {
    this.transform = transform;
  }
}
