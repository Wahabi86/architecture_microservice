import React from "react";
import { NavLink } from "react-router-dom";
import { Search, Edit, LogOut } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";

function Navbar() {
  // mengatur usermenu
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center px-20 py-4 text-[#00BFFF] bg-gradient-to-b from-black/80 via-black/40 to-black/30 fixed top-0 left-0 right-0 z-50">
        {/* Logo */}
        <NavLink to="/home">
          <h1 className="text-2xl font-bold tracking-wide">Mebalih Film</h1>
        </NavLink>

        {/* Menu Navigation */}
        <div className="flex items-center space-x-8">
          <NavLink to="/home" className={({ isActive }) => `transition-all duration-200 font-bold ${isActive ? "text-white" : "hover:text-white "}`}>
            Home
          </NavLink>
          <NavLink to="/mylist" className={({ isActive }) => `transition-all duration-200 font-bold ${isActive ? "text-white" : "hover:text-white "}`}>
            My List
          </NavLink>

          <SearchBar />

          {/* Profile */}
          <div className="relative">
            <button onClick={() => setOpenMenu(!openMenu)} className="flex items-center justify-center w-12 h-12 rounded-full border border-[#00BFFF]">
              <img src="/src/assets/user.png" alt="usericon" className="w-7 h-7 object-cover" />
            </button>
            {openMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-lg shadow-lg py-2 text-gray-800 z-50">
                {/* Edit Profile */}
                <NavLink to="/halaman-edit" onClick={() => setOpenMenu(false)} className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors font-semibold">
                  <Edit className="w-5 h-5 mr-2 text-[#00BFFF]" />
                  Edit Profile
                </NavLink>

                {/* Logout */}
                <NavLink to="/login" onClick={() => setOpenMenu(false)} className="flex items-center w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200 transition-colors font-semibold">
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
