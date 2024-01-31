import React, { useCallback, useState } from 'react';

import { useDeps } from '../../contexts';
import './login.page.scss';

export default function Login(): React.ReactElement {
  const { accessService } = useDeps();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const login = useCallback(() => {
    setSuccess(false);
    setError(false);

    accessService
      .login(username, password)
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setError(true);
      });
  }, [
    accessService,
    username,
    password,
  ]);

  return (
    <form>
      {success ? <h2 id='success'>SUCCESS!</h2> : null}
      {error ? <h2 id='error'>ERROR!</h2> : null}
      <input
        onChange={(e) => setUsername(e.target.value)}
        id='username'
        value={username}
        type='text'
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        id='password'
        value={password}
        type='password'
      />
      <button type='button' onClick={login}>
        LOGIN
      </button>
    </form>
  );
}
