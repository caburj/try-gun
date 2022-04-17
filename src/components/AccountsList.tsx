import { Observer, observer } from 'mobx-react-lite';
import accounts from '../accounts';

export default observer(() => {
  console.log('AccountsList');
  return (
    <ul>
      {accounts.getItems().map(([id, account]) => (
        <Observer key={id}>
          {() => (
            <li>
              <button onClick={() => accounts.delete(id)}>X</button>
              {account.name}
            </li>
          )}
        </Observer>
      ))}
    </ul>
  );
});
