import { observer } from 'mobx-react-lite';
import { getSyncedMap } from '../models/synced';
import { user } from '../user';
import PartitionPage from './PartitionsPage';

export default observer(({ id, account }: { id: string; account: any }) => {
  const accounts = getSyncedMap('accounts', user);
  return (
    <div>
      <div>
        <button onClick={() => accounts.delete(id)}>X</button>
        {account.name}
      </div>
      <PartitionPage accountId={id} />
    </div>
  );
});
