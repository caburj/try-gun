import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { getSyncedMap } from '../models/synced';
import { user } from '../user';

export default observer(() => {
  const accounts = getSyncedMap(['accounts'], user);
  const [accountName, setAccountName] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    await accounts.set(accountName, { name: accountName });
    setAccountName('');
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={accountName}
        onChange={(ev) => setAccountName(ev.target.value)}
      />
      <button type="submit">Create Account</button>
    </form>
  );
});
