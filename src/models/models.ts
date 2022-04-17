import { action, observable } from 'mobx';

type CompareFn<V> = (a: [string, V], b: [string, V]) => -1 | 0 | 1;

export interface IMyMap<V> {
  // a reactive map that automatically syncs to gun "Map" node
  delete(key: string): Promise<boolean>;
  get(key: string): V | undefined;
  set(key: string, value: V): Promise<boolean>;
  getItems(sortKey?: CompareFn<V>): [string, V][];
}

export function makeMap<V>(gunNode): IMyMap<V> {

  gunNode.map().on((val: V, id: string) => {
    setKey(id, val);
  });

  const obs = observable({} as Record<string, V>);

  const deleteKey = action((key: string) => {
    delete obs[key];
  });

  const setKey = action((key: string, val: V) => {
    obs[key] = val;
  });

  function _delete(key: string) {
    return new Promise<boolean>((resolve) => {
      gunNode.get(key).put(null, (ack) => {
        if (!ack.err) {
          deleteKey(key);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  function get(key: string) {
    return obs[key];
  }

  function set(key: string, val: V) {
    return new Promise<boolean>((resolve) => {
      gunNode.get(key).put(val, (ack) => {
        if (!ack.err) {
          setKey(key, val);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  function getItems(sortKey?: CompareFn<V>) {
    const entries = Object.entries(obs).filter(([key, val]) => val);
    if (!sortKey) {
      return entries;
    }
    entries.sort(sortKey);
    return entries;
  }

  return {
    get,
    set,
    delete: _delete,
    getItems,
  };
}
