import React, { useState } from "react";
import "../css/Register.css";
import Success from "./Success";
import axios from "axios";
import Error from "./Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const difftoast = (message) => {
    toast(message);
    console.log(message);
  };

  async function register() {
    if (password === confirmPassword) {
      const user = {
        name,
        email,
        password,
        confirmPassword,
      };
      const passwordPattern =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      try {
        if (!email.includes("@")) {
          difftoast("Please Enter valid Email Id");
        } else if (!passwordPattern.test(password)) {
          difftoast(
            "Password must contain at least 8 characters including uppercase, lowercase, numbers, and special characters"
          );
        } else {
          await axios.post("http://localhost:5000/api/register", user);
          difftoast("Registered Successfully");
          setSuccess(true);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      } catch (error) {
        setError(true);
        difftoast("Error Occurred!");
      }
    } else {
      difftoast("Passwords do not match");
    }
  }

  return (
    <>
      <div className="container">
        <div className="register-box">
          <div className="register-title">REGISTER PANEL</div>
          {error && <Error />}
          {success && <Success message="Registration Successful" />}
          <div className="form-group">
            <label className="form-control-label">NAME</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-control-label">EMAIL</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-control-label">PASSWORD</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-control-label">CONFIRM PASSWORD</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="button" className="btn-register" onClick={register}>
              REGISTER
            </button>
          </div>
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
        theme="dark"
      />
    </>
  );
}

export default Register;
