import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../SignUp/SignUp.css';
import {BASE_URL} from '../../services/helper'

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSignup = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${BASE_URL}/api/v1/users/signup`, {
          name,
          email,
          username,
          password,
        });
        console.log(response.data); // You can handle the response as per your requirements
        
        // Redirect to login page on successful signup
        navigate('/login');
      } catch (error) {
        setError(error.response.data.message);
      }
    };  
  
  return (
    <div className="container signup">
    <h2 className="signup-heading mx-auto">Signup</h2>

    <form onSubmit={handleSignup}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className="btn btn-outline-primary sbtn">
        Sign up
      </button>
      <br />
      <span>Have an account? <Link to = "/">Login</Link></span>
    </form>
  </div>

  );
};

export default SignUp