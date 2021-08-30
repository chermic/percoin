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
  const [isErrored, setIsErrored] = useState(false);

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
      setIsErrored(false);
    } else {
      setIsErrored(true);
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
        <div className="mb-6">
          <Input
            onChange={handleChangePassword}
            value={passwordValue}
            label="Password"
          />
        </div>
        {isErrored && (
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        )}
        <div className="flex items-center justify-around">
          <Button
            onClick={handleLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
