import { observer } from 'mobx-react-lite';
import boxes from '../models/boxes';

export default observer(({ id, account }: { id: string; account: any }) => {
	const accounts = boxes.get('accounts');
  return (
    <div>
      <button onClick={() => accounts.delete(id)}>X</button>
      {account.name}
    </div>
  );
});
