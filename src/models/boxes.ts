import { observable, runInAction } from 'mobx';
import { IMyMap } from './models';

export default {
  accounts: observable.box(null),
  get<T = any>(name: string): IMyMap<T> {
    return this[name].get();
  },
  set<T = any>(name: string, content: IMyMap<T>) {
    runInAction(() => {
      this[name].set(content);
    });
  },
};
