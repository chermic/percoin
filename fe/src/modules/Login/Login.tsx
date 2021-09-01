import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { login } from './redux/thunks';

const cre = {
  login: 'test',
  pass: '123123Qw!',
};

export const Login = () => {
  const dispatch = useDispatch();

  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChangeLogin = (
    e: React.ChangeEvent<HTMLInputElement>,
    login: string
  ): void => {
    setLoginValue(login);
  };

  const handleChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
    password: string
  ): void => {
    setPasswordValue(password);
  };

  const handleLogin = () => {
    if (loginValue === cre.login && passwordValue === cre.pass) {
      dispatch(login({ name: loginValue }));
      setError(null);
    } else {
      setError('Username and password combination not found');
      setPasswordValue('');
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <Input
          onChange={handleChangeLogin}
          value={loginValue}
          label="Username"
        />
        <div className="mb-2">
          <Input
            onChange={handleChangePassword}
            value={passwordValue}
            label="Password"
            type="password"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-around">
          <Button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            isDisabled={loginValue.length === 0 || passwordValue.length === 0}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
