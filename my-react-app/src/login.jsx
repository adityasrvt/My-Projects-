import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./index.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (signup(username, email, password)) {
        navigate("/profile");
      } else {
        setError("Please fill all fields");
      }
    } else {
      if (login(username, password)) {
        navigate("/profile");
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <div className="login-page-container">
      {/* Home Button */}
      <Link
        to="/"
        className="login-home-btn"
      >
        Home
      </Link>

      {/* Login/Signup Card */}
      <div className="login-card">
        {/* Tab Headers */}
        <div className="login-tabs">
          <button
            onClick={() => setIsSignup(false)}
            className={`login-tab ${!isSignup ? 'active' : ''}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`login-tab ${isSignup ? 'active' : ''}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="login-input-group">
            <label className="login-label">
              {isSignup ? '👤 ' : '✉️ '}
              {isSignup ? 'Username' : 'Enter your username'}
            </label>
            <input 
              type="text" 
              className="login-input"
              placeholder={isSignup ? "Enter username" : ""}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email - only for signup */}
          {isSignup && (
            <div className="login-input-group">
              <label className="login-label">
                ✉️ Enter your email
              </label>
              <input 
                type="email" 
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="login-input-group">
            <label className="login-label">
              🔒 Enter your password
            </label>
            <input 
              type="password" 
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember me / Forgot password */}
          {!isSignup && (
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
          )}

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button type="submit" className="login-submit-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>

        
        </form>
      </div>
    </div>
  );
};

export default Login;
