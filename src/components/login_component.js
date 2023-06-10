import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const baseUrl = "http://localhost:4000";
  const authUrl = "auth/signIn"
  const authLogin = "auth/login"
  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password , role);
    console.log(typeof role);
    fetch(`${baseUrl}/${authUrl}`, {
      method : "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
        role:role
        
      }),
      
    })
      .then((res) => {
        if (res.status === 401) {
          alert(`you are not the ${role}`)
        }else{
          return res.json()
        }
        
      })
      .then((data) => {
        console.log(data._doc.role);
        if (data._doc.role === 'user') {
          navigate('/user');
        } else if (data._doc.role === 'admin') {
          navigate('/admin');
        }
        
      })
      .catch((error) => {
        console.error(error);
        
       
      })
      
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Role</label>
            <select
              className="form-control"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/sign-up">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
