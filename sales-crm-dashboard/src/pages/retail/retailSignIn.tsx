// pages/SignIn.tsx
import React, { useState } from 'react';
import Topbar from '../../components/crm/Topbar';
import styles from '../../styles/crm/auth.module.css';
import { Link, useNavigate } from 'react-router-dom';

const RetailSignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        console.log('Login response data:', data);
        localStorage.setItem('token', data.token); // Store token in localStorage
        localStorage.setItem('branchShortId', data.branchShortId); // Store branchShortId in localStorage
        navigate('/retail/main'); // Navigate to the main dashboard on successful login
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <Topbar />
      <div className={styles.authContent}>
        <div className={styles.infoSection}>
          <h2>Welcome Back!</h2>
          <p>Sign in to manage your Retail and track your sales, leads, and more.</p>
        </div>
        <div className={styles.formSection}>
          <h2>Sign In</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
          <p>Don't have an account? <Link to="/retail/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RetailSignIn;
