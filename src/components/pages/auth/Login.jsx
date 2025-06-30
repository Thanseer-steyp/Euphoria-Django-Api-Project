import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "../../../Auth.css";
import Swal from 'sweetalert2';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/login/', {
        username,
        password,
      });

      const { access, refresh, user } = res.data;

      // Store tokens
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      // Store user name info if available
      if (user?.first_name) {
        localStorage.setItem('first_name', user.first_name);
      }
      if (user?.last_name) {
        localStorage.setItem('last_name', user.last_name);
      }

      // Let other components like Header know about the login
      window.dispatchEvent(new Event('login-status-changed'));

      // Redirect
      navigate('/');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid credentials',
      });
    }
  };

  return (
    <section className="container">
      <section className="form_container">
        <div className="top">
          <h5>Euphoria Login Page</h5>
        </div>
        <div className="bottom">
          <form onSubmit={handleLogin}>
            <div className="input_container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input_container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="submit_container">
              <button type="submit">Log in</button>
              <Link to="/signup">Create Account</Link>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}

export default Login;
