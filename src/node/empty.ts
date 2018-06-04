import { Implementation } from '../implementation';
import { Node } from './base';

export class Empty<I extends Implementation<Node<I>>> extends Node<I> {
}
