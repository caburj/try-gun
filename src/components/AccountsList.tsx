import { Observer, observer } from 'mobx-react-lite';
import boxes from '../models/boxes';
import AccountView from './AccountView';

export default observer(() => {
  const accounts = boxes.get('accounts');
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
