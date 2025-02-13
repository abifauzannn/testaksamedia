import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Navbar = ({ user, setUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser("");
    navigate("/");
  };

  return (
    <nav className="bg-white flex justify-between items-center border-b border-gray-300 pb-2 px-4">
      <h1 className="text-[#181C14] text-2xl font-bold">Dashboard</h1>
      {user && (
        <div className="relative">
          <div className="flex flex-row gap-2 items-center">
          <p className="text-[#181C14] font-bold text-1xl">Halo, {user}</p>
          <div onClick={() => setDropdownOpen(!dropdownOpen)} className="text-gray-400">
            <IoMdArrowDropdown size={25} />
          </div>
          </div>
         
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-50 p-3">
              <Link
                to="/edit-profile"
                className="block px-4 py-3 w-full text-slate-500 hover:bg-gray-200 flex flex-row items-center gap-2 rounded-md text-[14px]"
              >
                <FaEdit size={20} /> Edit Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block px-4 py-3 w-full text-slate-500 hover:bg-gray-200 flex flex-row items-center gap-2 rounded-md text-[14px]"
              >
                <IoLogOut size={20} /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
