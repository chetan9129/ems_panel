import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    const user = { email, password };
    try {
      const result = await axios.post("http://localhost:5000/api/login", user);

      document.cookie = `currentUser=${JSON.stringify(
        result.data
      )}; expires=Thu, 31 Dec 2024 23:59:59 GMT; path=/`;
      toast.success("Successfully Logged In");
      navigate("/");
    } catch (error) {
      toast.error("Incorrect Credentials");
      setError("Incorrect Credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-key">
          <i className="fa fa-key" aria-hidden="true"></i>
        </div>
        <div className="login-title">Login Panel</div>

        {error && <div className="error-message">{error}</div>}

        <div className="login-form">
          <div className="form-group">
            <label className="form-control-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label className="form-control-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button onClick={login} className="btn-login">
            Login
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Login;
