// Copyright 2017-2019 @polkadot/client-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

type Node<K, V> = {
  key: K,
  next: Node<K, V> | null,
  prev: Node<K, V> | null,
  value: V
};

export default class LRU<K,V> {
  private _head?: Node<K, V> | null;
  private _tail?: Node<K, V> | null;
  private _limit: number;
  private _size: number = 0;
  private _map: Map<K, Node<K, V>> = new Map();

  constructor (limit: number) {
    this._limit = limit;
  }

  private _checkLimit (): void {
    if (this._size === this._limit && this._tail) {
      this._map.delete(this._tail.key);
      this._size--;

      if (this._tail.prev) {
        this._tail.prev.next = null;
      }

      this._tail = this._tail.prev;
    }
  }

  private _setAsHead (node: Node<K, V>): void {
    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node !== this._head) {
      node.prev = null;
      node.next = this._head || null;

      if (this._head) {
        this._head.prev = node;
      }

      this._head = node;
    }
  }

  set (key: K, value: V): void {
    const cached = this._map.get(key);

    if (!cached) {
      if (!this._head) {
        this._head = this._tail = { key, value, next: null, prev: null };
      } else {
        const node = { key, value, next: this._head, prev: null };

        this._head.prev = node;
        this._head = node;
      }

      this._map.set(key, this._head);
      this._size++;

      this._checkLimit();
    } else {
      this._setAsHead(cached);
    }
  }

  get (key: K): V | undefined {
    const cached = this._map.get(key);

    if (!cached) {
      return;
    }

    this._setAsHead(cached);

    return cached.value;
  }
}
