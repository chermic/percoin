import './App.css';
import { Header } from './components/header';
import { Body } from './components/body';
import { Footer } from './components/footer';
import { ReactQueryDevtools } from 'react-query/devtools';

import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './store';
import { LOCAL_STORAGE_KEYS } from './constants';
import { Login } from './modules/Login';
import { Redirect, Route, Router } from 'react-router-dom';
import { history, ROUTES } from './router';

const AuthRouter = (): JSX.Element => {
  return (
    <Route path={ROUTES.HOME}>
      <div className="App">
        <Header />
        <Body />
        <Footer />
      </div>
    </Route>
  );
};

const NonAuthRouter = (): JSX.Element => {
  return (
    <>
      <Route path={ROUTES.LOGIN}>
        <Login />
      </Route>
      <Redirect to={ROUTES.LOGIN} />
    </>
  );
};

const queryClient = new QueryClient();

const Providers = ({
  children,
}: {
  children: React.ReactChild;
}): JSX.Element => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </Router>
  );
};

function App() {
  const user = useSelector<RootState>((state) => state.user);
  const localStorageUserLogin =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.login) ?? 'null') ??
    null;
  if (typeof localStorageUserLogin === 'string' && !user) {
    ;
  }

  return (
    <Providers>
      {localStorageUserLogin ? <AuthRouter /> : <NonAuthRouter />}
    </Providers>
  );
}

export default App;
