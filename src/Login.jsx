import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      setUser(username);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col p-9 border border-gray-300 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          autoFocus
          type="text"
          name="username"
          placeholder="Enter your username"
          className="border p-4 mb-2 rounded w-64"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="border p-4 mb-4 rounded w-64"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-[#181C14] text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
