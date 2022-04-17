import { observer } from 'mobx-react-lite';
import { FormEvent, useState } from 'react';

export default observer(
  ({
    onLogin,
  }: {
    onLogin: (
      username: string,
      password: string,
      signup: boolean
    ) => Promise<boolean>;
  }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const res = await onLogin(username, password, false);
      if (res) {
        setUsername('');
        setPassword('');
      }
    };
    const onClickSignUp = async () => {
      const res = await onLogin(username, password, true);
      if (res) {
        setUsername('');
        setPassword('');
      }
    };
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
        <button onClick={onClickSignUp}>Sign Up</button>
      </form>
    );
  }
);
