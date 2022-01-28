import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMoreHorizontal } from 'react-icons/fi';
import Message from "../widgets/Message";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      setSuccess("");
      setSuccess("User authorized successfully");
      setTimeout(() => {
        history.push("/");
      }, 2000);

    } catch (error) {
      setError("");
      setError(error.response.data.error);
    }
  };

  return (
    <div className="view-cover h100">
      <form onSubmit={loginHandler} className="column h100">
        <div className="row mgn-b">
          <button type="button" className="btn btn-round mgn-r"><FiArrowLeft size={18} /></button>
          <h3>Login user</h3>
        </div>
        
        <div className="expand column centered mgn-b">
          <div className="form-group row mgn-b">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              placeholder="your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              tabIndex={1}
            />
          </div>
          <div className="form-group row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              autoComplete="true"
              placeholder="your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              tabIndex={2}
            />
          </div>
        </div>

        <div className="row spaced">
          <button type="button" className="btn btn-round mgn-r"><FiMoreHorizontal size={18} /></button>
          <h4>hotchpotch</h4>
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>

      <Message message={error} type="error" />
      <Message message={success} type="success" />
    </div>
  );
};

export default LoginScreen;
