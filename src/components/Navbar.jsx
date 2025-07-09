import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 shadow-md">
      {/* Logo / Brand */}
      <div className="flex items-center gap-2 text-2xl font-extrabold text-white cursor-pointer transition hover:text-gray-900">
        <FaMapMarkerAlt className="text-white drop-shadow" />
        <span className="tracking-wide">Spots Alert</span>
      </div>
    </nav>
  );
};

export default Navbar;
