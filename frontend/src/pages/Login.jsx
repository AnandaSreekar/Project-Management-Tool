import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
 
  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

toast.success(response.data.message);

navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
  <div className="auth-page">

    <div className="auth-card">

      <h1>Welcome Back 👋</h1>

      <p className="subtitle">
        Login to your Project Management Dashboard
      </p>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={handleLogin}
      >
        Login
      </button>

      <p className="auth-link">
        New User?
        <Link to="/register">
          Register
        </Link>
      </p>

    </div>

  </div>
);
}
export default Login;
