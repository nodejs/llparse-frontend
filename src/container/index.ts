import * as assert from 'assert';

import { ICodeImplementation } from '../implementation/code';
import { IImplementation } from '../implementation/full';
import { INodeImplementation } from '../implementation/node';
import { ITransformImplementation } from '../implementation/transform';
import { IWrap } from '../wrap';
import { ContainerWrap } from './wrap';

export { ContainerWrap };

export class Container {
  private readonly map: Map<string, IImplementation> = new Map();

  public add(key: string, impl: IImplementation): void {
    assert(!this.map.has(key), `Duplicate implementation key: "${key}"`);
    this.map.set(key, impl);
  }

  public build(): IImplementation {
    return {
      code: this.buildCode(),
      node: this.buildNode(),
      transform: this.buildTransform(),
    };
  }

  public buildCode(): ICodeImplementation {
    return {
      IsEqual: this.combine((impl) => impl.code.IsEqual),
      Load: this.combine((impl) => impl.code.Load),
      Match: this.combine((impl) => impl.code.Match),
      MulAdd: this.combine((impl) => impl.code.MulAdd),
      Or: this.combine((impl) => impl.code.Or),
      Span: this.combine((impl) => impl.code.Span),
      Store: this.combine((impl) => impl.code.Store),
      Test: this.combine((impl) => impl.code.Test),
      Update: this.combine((impl) => impl.code.Update),
      Value: this.combine((impl) => impl.code.Value),
    };
  }

  public buildNode(): INodeImplementation {
    return {
      Consume: this.combine((impl) => impl.node.Consume),
      Empty: this.combine((impl) => impl.node.Empty),
      Error: this.combine((impl) => impl.node.Error),
      Invoke: this.combine((impl) => impl.node.Invoke),
      Pause: this.combine((impl) => impl.node.Pause),
      Sequence: this.combine((impl) => impl.node.Sequence),
      Single: this.combine((impl) => impl.node.Single),
      SpanEnd: this.combine((impl) => impl.node.SpanEnd),
      SpanStart: this.combine((impl) => impl.node.SpanStart),
      TableLookup: this.combine((impl) => impl.node.TableLookup),
    };
  }

  public buildTransform(): ITransformImplementation {
    return {
      ID: this.combine((impl) => impl.transform.ID),
      ToLowerUnsafe: this.combine((impl) => impl.transform.ToLowerUnsafe),
    };
  }

  private combine<T>(gather: (impl: IImplementation) => new(n: T) => IWrap<T>)
    : new(n: T) => ContainerWrap<T> {
    const wraps: Map<string, new(n: T) => IWrap<T>> = new Map();
    for (const [ key, impl ] of this.map) {
      wraps.set(key, gather(impl));
    }

    return class ContainerWrapSingle extends ContainerWrap<T> {
      constructor(ref: T) {
        super(ref);

        for (const [ key, impl ] of wraps) {
          this.map.set(key, new impl(ref));
        }
      }
    };
  }
}
