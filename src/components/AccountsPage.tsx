import { observer } from 'mobx-react-lite';
import AccountsList from './AccountsList';
import CreateAccount from './CreateAccount';

export default observer(() => {
  return (
    <div>
      <CreateAccount />
      <AccountsList />
    </div>
  );
});
