import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../../Auth.css";
import Swal from "sweetalert2";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/signup/", {
        first_name: firstname,
        username,
        email,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "Log in to your account.",
        confirmButtonText: "Login",
      }).then(() => {
        navigate("/login");
      });
    } catch (err) {
      const error = err?.response?.data;
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error?.detail || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <section className="container">
        <section className="form_container">
          <div className="top">
            <h5>Euphoria Signup Page</h5>
          </div>
          <div className="bottom">
            <form onSubmit={handleSignup}>
              <div className="input_container">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="input_container">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input_container">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input_container">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="submit_container">
                <button type="submit">Create Account</button>
                <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </section>
      </section>
    </>
  );
}

export default Signup;
