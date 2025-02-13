import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user, setUser }) => {
  const [newName, setNewName] = useState(user);
  const navigate = useNavigate();

  const handleSave = () => {
    if (newName.trim()) {
      setUser(newName);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="border p-2 mb-4 rounded"
      />
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </div>
  );
};

export default EditProfile;
