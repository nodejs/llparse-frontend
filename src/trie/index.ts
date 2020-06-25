import * as assert from 'assert';
import { Buffer } from 'buffer';
import { Edge, node as api } from 'llparse-builder';

import { TrieEmpty } from './empty';
import { TrieNode } from './node';
import { TrieSequence } from './sequence';
import { ITrieSingleChild, TrieSingle } from './single';

export { TrieEmpty, TrieNode, TrieSequence, TrieSingle };

interface IEdge {
  readonly key: Buffer;
  readonly node: api.Node;
  readonly noAdvance: boolean;
  readonly value: number | undefined;
}

type Path = ReadonlyArray<Buffer>;
type EdgeArray = ReadonlyArray<IEdge>;

export class Trie {
  constructor(private readonly name: string) {
  }

  public build(edges: ReadonlyArray<Edge>): undefined | TrieNode {
    if (edges.length === 0) {
      return undefined;
    }

    const internalEdges: IEdge[] = [];
    for (const edge of edges) {
      internalEdges.push({
        key: edge.key as Buffer,
        noAdvance: edge.noAdvance,
        node: edge.node,
        value: edge.value,
      });
    }

    return this.level(internalEdges, []);
  }

  private level(edges: EdgeArray, path: Path): TrieNode {
    const first = edges[0].key;
    const last = edges[edges.length - 1].key;

    // Leaf
    if (edges.length === 1 && edges[0].key.length === 0) {
      return new TrieEmpty(edges[0].node, edges[0].value);
    }

    // Find the longest common sub-string
    let common = 0;
    for (; common < first.length; common++) {
      if (first[common] !== last[common]) {
        break;
      }
    }

    // Sequence
    if (common > 1) {
      return this.sequence(edges, first.slice(0, common), path);
    }

    // Single
    return this.single(edges, path);
  }

  private slice(edges: EdgeArray, off: number): EdgeArray {
    return edges.map((edge) => {
      return {
        key: edge.key.slice(off),
        noAdvance: edge.noAdvance,
        node: edge.node,
        value: edge.value,
      };
    }).sort((a, b) => {
      return a.key.compare(b.key);
    });
  }

  private sequence(edges: EdgeArray, prefix: Buffer, path: Path): TrieNode {
    const sliced = this.slice(edges, prefix.length);
    const noAdvance = sliced.some((edge) => edge.noAdvance);
    assert(!noAdvance);
    const child = this.level(sliced, path.concat(prefix));

    return new TrieSequence(prefix, child);
  }

  private single(edges: EdgeArray, path: Path): TrieNode {
    // Check for duplicates
    if (edges[0].key.length === 0) {
      assert(path.length !== 0, `Empty root entry at "${this.name}"`);
      assert(edges.length === 1 || edges[1].key.length !== 0,
        `Duplicate entries in "${this.name}" at [ ${path.join(', ')} ]`);
    }

    let otherwise: TrieEmpty | undefined;
    const keys: Map<number, IEdge[]> = new Map();
    for (const edge of edges) {
      if (edge.key.length === 0) {
        otherwise = new TrieEmpty(edge.node, edge.value);
        continue;
      }
      const key = edge.key[0];

      if (keys.has(key)) {
        keys.get(key)!.push(edge);
      } else {
        keys.set(key, [ edge ]);
      }
    }

    const children: ITrieSingleChild[] = [];
    keys.forEach((subEdges, key) => {
      const sliced = this.slice(subEdges, 1);
      const subpath = path.concat(Buffer.from([ key ]));

      const noAdvance = subEdges.some((edge) => edge.noAdvance);
      const allSame = subEdges.every((edge) => edge.noAdvance === noAdvance);

      assert(allSame || subEdges.length === 0,
        'Conflicting `.peek()` and `.match()` entries in ' +
          `"${this.name}" at [ ${subpath.join(', ')} ]`);

      children.push({
        key,
        noAdvance,
        node: this.level(sliced, subpath),
      });
    });
    return new TrieSingle(children, otherwise);
  }
}
