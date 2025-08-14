import React from "react";
import { FiMenu, FiSearch, FiBell, FiMail } from "react-icons/fi";

function Topbar({ onMenuClick }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button */}
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiMenu className="w-5 h-5 text-gray-600" />
        </button>

        {/* Right side - Search, Notifications, and Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search icon - Hidden on very small screens */}
          <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FiSearch className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notification icons with badges */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* First notification (mail) */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium text-[10px] sm:text-xs">
                3
              </span>
            </button>

            {/* Second notification (bell) */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <FiBell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-medium text-[10px] sm:text-xs">
                12
              </span>
            </button>
          </div>

          {/* Profile section */}
          <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-gray-200">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm font-medium">SB</span>
            </div>
            <div className="hidden md:block text-sm">
              <div className="font-medium text-gray-900">Siddharth Bose</div>
              <div className="text-gray-500">Super Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;