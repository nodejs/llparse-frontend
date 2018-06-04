import { Implementation } from '../implementation';
import { Node } from './base';
import { Error as ErrorNode } from './error';

export class Pause<I extends Implementation<Node<I>>> extends ErrorNode<I> {
}
