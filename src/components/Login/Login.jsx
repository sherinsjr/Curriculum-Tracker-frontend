import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Login/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/login', {
        username,
        password,
      });

      // Handle successful login
      const token = response.data.token;
      // Store the token in local storage or any other secure storage method of your choice
      localStorage.setItem('token', token);

      // Fetch the user role from the backend API
      try {
        const roleResponse = await axios.get('http://localhost:5000/api/v1/users/userRole', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userRole = roleResponse.data.role;

        if (userRole === 'admin') {
          alert('Logged in successfully as admin.');
        } else if (userRole === 'user') {
          alert('Logged in successfully as user.');
        } else {
          alert('Logged in successfully.');
        }
      } catch (error) {
        console.log(error.response.data);
        // TODO: Handle error
      }

      // Redirect to the desired page after successful login
      navigate('/requirement');
    } catch (error) {
      console.log(error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container-1">
      <h2 className="lheading">LOGIN</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <br/>
        <span>Not yet registered? <Link to= "/signup">Register</Link></span>
      </form>
    </div>
  );
};

export default Login;
