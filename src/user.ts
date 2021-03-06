import { action, observable } from 'mobx';
import { gun } from './store';

export const userAlias = observable.box('');

const setUserAlias = action((name: string) => userAlias.set(name));

export const user = gun.user().recall({ sessionStorage: true });

user.get('alias').on((val: string) => setUserAlias(val));

gun.on('auth', async (event) => {
  const alias = await user.get('alias');
  setUserAlias(alias);
  console.log(`signed in as ${alias}`);
});

export const login = (
  username: string,
  password: string,
  signup: boolean = false
): Promise<boolean> => {
  return new Promise(async (resolve) => {
    if (signup) {
      user.create(username, password, async (ack) => {
        if (ack.err) {
          resolve(false);
        } else {
          resolve(await login(username, password));
        }
      });
    } else {
      user.auth(username, password, (ack) => {
        if (ack.err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    }
  });
};
