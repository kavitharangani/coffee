import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background from "../../public/img/caffe.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        userName,
        email,
        password,
        confirmPassword,
        role,
      });

      setSuccess(response.data.message);
      setError("");
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Registration failed");
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-96 bg-black/50 backdrop-blur-md border border-white/20 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        <form onSubmit={handleRegister}>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Username"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full h-12 bg-transparent border border-white/20 rounded-full px-5 text-white placeholder-white focus:outline-none"
            />
          </div>

          <div className="relative mb-6">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-transparent border border-white/20 rounded-full px-5 text-white placeholder-white focus:outline-none"
            />
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-transparent border border-white/20 rounded-full px-5 text-white placeholder-white focus:outline-none"
            />
          </div>

          <div className="relative mb-6">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 bg-transparent border border-white/20 rounded-full px-5 text-white placeholder-white focus:outline-none"
            />
          </div>

          <div className="relative mb-6">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-12 bg-transparent border border-white/20 rounded-full px-5 text-white focus:outline-none"
            >
              <option value="user" className="text-black">User</option>
              <option value="admin" className="text-black">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-white text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
          >
            Register
          </button>

          <div className="text-sm text-center mt-5">
            <p>
              Already have an account?{" "}
              <a href="/login" className="font-semibold hover:underline">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;