import { Observer, observer } from 'mobx-react-lite';
import { getSyncedMap } from '../models/synced';
import { user } from '../user';
import AccountView from './AccountView';

export default observer(() => {
  const accounts = getSyncedMap('accounts', user);
  return (
    <div>
      {accounts.getItems().map(([id, account]) => (
        <Observer key={id}>
          {() => <AccountView id={id} account={account} />}
        </Observer>
      ))}
    </div>
  );
});
