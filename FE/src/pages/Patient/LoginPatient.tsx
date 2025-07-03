import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPatient: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add login logic here
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Patient Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Login
        </button>

        <div className="mt-4 text-sm text-center text-gray-600">
          <p>
            Not registered?{' '}
            <button
              type="button"
              onClick={() => navigate('/register/patient')}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Register here
            </button>
          </p>
          <p className="mt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-gray-500 hover:underline cursor-pointer"
            >
              ← Back to Home
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPatient;
