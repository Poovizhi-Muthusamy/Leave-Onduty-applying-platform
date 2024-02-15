import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './two.css';
import './apply.css'
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const resetFields = () => {
    setUsername('');
    setPassword('');
  };
  const handleSuccessfulLogin = (username) => {
    // Store the username in the session (localStorage or sessionStorage)
    localStorage.setItem('username', username);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
        const response = await axios.post('http://127.0.0.1:8000/login', {
            username: username,
            password: password,
          });

          const {status,message} = response.data;
    if(status==="success")
    {
      if (username === 'admin' && password === '123') {
        alert('Login successful as admin!');
        navigate('/admin');
      } else {
        alert('Login successful as student!');
        handleSuccessfulLogin(username);
        navigate('/student');
      }
    }
    else
    {
      alert('username/password wrong');
      resetFields();
      navigate('/login');
    }
        
        };

  return (
    <div>
    <div className='bghead newbg'>
          <h2 className='head newbg'>Leave and On-duty Applying Portal</h2><br/>
        </div>
    <div className='loginB '>
    <div className="container1 newbg">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <br></br>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Enter your Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Enter your Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Login;
