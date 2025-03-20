import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background from "../../public/img/caffe.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e:any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("role", response.data.role);
      navigate("/home");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Login failed");
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-96 bg-black/50 backdrop-blur-md border border-white/20 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="relative mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 bg-transparent border border-white/20 rounded-full px-5 text-white placeholder-white focus:outline-none"
            />
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 bg-transparent border border-white/20 rounded-full px-5 text-white placeholder-white focus:outline-none"
            />
          </div>
          
          <div className="flex justify-between text-sm mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="accent-white mr-2" />
              Remember Me
            </label>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" className="w-full h-12 bg-white text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition">
            Login
          </button>

          <div className="text-sm text-center mt-5">
            <p>Don't have an account? <a href="/register" className="font-semibold hover:underline">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
