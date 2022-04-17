import { observer } from 'mobx-react-lite';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { login, username } from './user';

const App = observer(() => {
  return (
    <div>
      {username.get() ? (
        <MainPage />
      ) : (
        <LoginPage onLogin={login} />
      )}
    </div>
  );
});

export default App;
