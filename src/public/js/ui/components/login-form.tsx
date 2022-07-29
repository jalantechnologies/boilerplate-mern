/**
 * THIS IS JUST AN EXAMPLE COMPONENT TO SHOW-CASE THE CYPRESS INTEGRATIONS
 * AND CAN BE REMOVED AT ANY POINT.
 *
 * -RREM
 */
import axios from 'axios';
import React, { useState } from 'react';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const login = async () => {
    setSuccess(false);
    setError(false);

    const data = { username, password };
    const loginUrl = `http://localhost:8080/api/access-tokens`;

    try {
      await axios.post(loginUrl, data);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <form>
      {success ? <h2 id="success">SUCCESS!</h2> : null}
      {error ? <h2 id="error">ERROR!</h2> : null}
      <input
        onChange={(e) => setUsername(e.target.value)}
        id="username"
        value={username}
        type="text"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        value={password}
        type="password"
      />
      <button type="button" onClick={login}>
        LOGIN
      </button>
    </form>
  );
};
