import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import EditProfile from "./EditProfile";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/dashboard" element={user ? <Dashboard user={user} setUser={setUser} /> : <RedirectToLogin />} />
      <Route path="/edit-profile" element={user ? <EditProfile user={user} setUser={setUser} /> : <RedirectToLogin />} />
    </Routes>
  );
};

const RedirectToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return null;
};

export default App;
