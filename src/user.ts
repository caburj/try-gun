import { observable, runInAction } from 'mobx';
import { gun } from './store';

export const username = (() => {
  const ref = observable.box('');
  return {
    get() {
      return ref.get();
    },
    set(val: string) {
      runInAction(() => ref.set(val));
    },
  };
})();

export const user = gun.user().recall({ sessionStorage: true });

user.get('alias').on((val: string) => username.set(val));

gun.on('auth', async (event) => {
  const alias = await user.get('alias');
  username.set(alias);
  console.log(`signed in as ${alias}`);
});

export const login = (
  username: string,
  password: string,
  signup: boolean = false
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    if (signup) {
      user.create(username, password, async ({ err }: { err: any }) => {
        if (err) {
          resolve(false);
        } else {
          resolve(await login(username, password));
        }
      });
    } else {
      user.auth(username, password, ({ err }: { err: any }) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    }
  });
};
