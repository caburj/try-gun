import { observable, runInAction } from 'mobx';
import { isNone } from '../utils';

export interface IMySyncedObject<I extends Object> {
  set<K extends keyof I>(key: K, val: I[K]): Promise<boolean>;
  get<K extends keyof I>(key: K): I[K];
}

export interface IMySyncedMap<V = any> {
  set(key: string, val: Partial<V>): Promise<boolean>;
  get(key: string): V;
  delete(key: string): Promise<boolean>;
  getItems(): Array<[string, V]>;
}

const gCache = {};
const sCache: Record<string, unknown> = {};

const gCacheMap = {};
const sCacheMap = {};

function wrapObj(m, g) {
  function set(key: string, val) {
    return new Promise<boolean>((resolve) => {
      g.put(val, (ack) => {
        if (!ack.err) {
          runInAction(() => {
            m[key] = val;
          });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  function get(key: string) {
    return m[key];
  }

  return { get, set };
}

export function getSyncedObj<T = any>(path: string[], root): IMySyncedObject<T> {
  const strPath = path.join('.');
  if (!(strPath in gCache)) {
    const g = root.path(strPath);
    const m = observable({});

    // start observing the gun object.
    g.on((data, key) => {
      if (data) {
        for (const k in data) {
          if (k == '_') continue;
          m[k] = data[k];
        }
      }
    });

    gCache[strPath] = g;
    sCache[strPath] = wrapObj(m, g);
  }

  return sCache[strPath] as IMySyncedObject<T>;
}

function getMake(obj, key: string) {
  if (!(key in obj)) {
    obj[key] = {};
  }
  return obj[key];
}

function wrapMap<V>(m, g): IMySyncedMap<V> {
  function get(key: string) {
    return m[key];
  }

  function set(key: string, val: Partial<V>) {
    return new Promise<boolean>((resolve) => {
      g.get(key).put(val, (ack) => {
        if (!ack.err) {
          if (isNone(val)) {
            runInAction(() => {
              delete m[key];
            });
          } else {
            const existing = getMake(m, key);
            for (const k in val) {
              if (k == '_') continue;
              runInAction(() => {
                existing[k] = val[k];
              });
            }
          }
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  function _delete(key: string): Promise<boolean> {
    return set(key, null);
  }

  function getItems() {
    return Object.entries(m).filter(([key, val]) => !isNone(val)) as Array<
      [string, V]
    >;
  }

  return { get, set, getItems, delete: _delete };
}

export function getSyncedMap<V = any>(path: string[], root): IMySyncedMap<V> {
  const strPath = path.join('.');
  if (!(strPath in gCacheMap)) {
    const g = root.path(strPath);
    const m = observable({} as Record<string, V>);

    g.map().on((data, key) => {
      if (data) {
        const existing = getMake(m, key);
        for (const k in data) {
          if (k == '_') continue;
          runInAction(() => {
            existing[k] = data[k];
          });
        }
      } else {
        delete m[key];
      }
    });

    gCacheMap[strPath] = g;
    sCacheMap[strPath] = wrapMap<V>(m, g);
  }
  return sCacheMap[strPath];
}
