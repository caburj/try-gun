import { observer } from 'mobx-react-lite';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import { login, userAlias } from './user';

const App = observer(() => {
  return (
    <div>
      {userAlias.get() ? (
        <MainPage />
      ) : (
        <LoginPage onLogin={login} />
      )}
    </div>
  );
});

export default App;
