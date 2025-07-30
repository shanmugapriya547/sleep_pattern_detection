import React from 'react';
import '../App.css'; // ✅ Correct
import './Signup.css';

import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/form'); // redirects to form after sign up
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" name="username" required />

        <label>Email</label>
        <input type="email" name="email" required />

        <label>Password</label>
        <input type="password" name="password" required />

        <div className="checkbox-group">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember password</label>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
