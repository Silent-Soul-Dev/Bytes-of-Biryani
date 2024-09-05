// src/components/SignUp.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/app.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('franchise');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (username && password) {
      // Save user credentials in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = existingUsers.some((user) => user.username === username);

      if (userExists) {
        alert('Username already exists!');
      } else {
        existingUsers.push({ username, password, role });
        localStorage.setItem('users', JSON.stringify(existingUsers));
        alert('Sign-up successful! Please log in.');
        navigate('/login');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
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
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="franchise">Franchise</option>
        <option value="yard">Yard</option>
        <option value="manufacturer">Manufacturer</option>
      </select>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
