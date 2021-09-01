import './App.css';
import { Header } from './components/header';
import { Body } from './components/body';
import { Footer } from './components/footer';
import { ReactQueryDevtools } from 'react-query/devtools';

import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './store';
import { LOCAL_STORAGE_KEYS } from './constants';
import { Login } from './modules/Login';
import { Redirect, Route, Router } from 'react-router-dom';
import { history, ROUTES } from './router';
import { login } from './modules/Login/redux/thunks';

const AuthRouter = (): JSX.Element => {
  return (
    <>
      <Route path={ROUTES.HOME}>
        <div className="h-screen flex flex-col justify-between">
          <Header />
          <Body />
          <Footer />
        </div>
      </Route>
      <Redirect to={ROUTES.HOME} />
    </>
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

const Routes = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const user = useSelector<RootState>((state) => state.user.user);
  const localStorageUserLogin =
    localStorage.getItem(LOCAL_STORAGE_KEYS.login) ?? null;
  if (typeof localStorageUserLogin === 'string' && !user) {
    dispatch(login({ name: localStorageUserLogin }));
  }
  return localStorageUserLogin ? <AuthRouter /> : <NonAuthRouter />;
};

function App() {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
}

export default App;
