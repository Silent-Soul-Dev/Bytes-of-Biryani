// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/app.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Save logged in user to localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on user role
      if (user.role === 'franchise') {
        navigate('/franchise');
      } else if (user.role === 'yard') {
        navigate('/yard');
      } else if (user.role === 'manufacturer') {
        navigate('/manufacturer');
      }
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Dont have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
