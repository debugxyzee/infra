import React, { useState } from "react";
import { 
  MdAdd, 
  MdKeyboardArrowDown, 
  MdKeyboardArrowRight,
  MdDashboard,
  MdPeople,
  MdSettings,
  MdFolder,
  MdBarChart,
  MdHelp
} from "react-icons/md";
import { FiX } from "react-icons/fi";
import { navItems } from "../../Data/sidebarData";

function Sidebar({ isOpen, onClose, className = "" }) {
  const [expandedItems, setExpandedItems] = useState(["assets"]);

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const renderNavItem = (item, isChild = false) => {
    let baseClasses =
      "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors";
    if (isChild) baseClasses += " ml-6 pl-2";
    if (item.isActive) {
      baseClasses += " text-white";
      baseClasses += " bg-[#B52B6E]"; // Updated active color
    } else {
      baseClasses += " text-gray-600 hover:bg-gray-50";
    }

    return (
      <li key={item.id}>
        <button
          onClick={() => item.hasDropdown && toggleExpanded(item.id)}
          className={baseClasses}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1 text-sm font-medium">{item.label}</span>

          {/* Badge */}
          {item.badge && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {item.badge}
            </span>
          )}

          {/* Dropdown Arrow */}
          {item.hasDropdown &&
            (expandedItems.includes(item.id) ? (
              <MdKeyboardArrowDown className="w-4 h-4 flex-shrink-0" />
            ) : (
              <MdKeyboardArrowRight className="w-4 h-4 flex-shrink-0" />
            ))}
        </button>

        {item.hasDropdown && item.children && expandedItems.includes(item.id) && (
          <ul className="mt-1 space-y-1">
            {item.children.map((child) => renderNavItem(child, true))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <>
      {/* Mobile Overlay - Only show on mobile when sidebar is open */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 backdrop-blur bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200 h-full lg:h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out lg:transition-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${!isOpen && 'lg:-translate-x-full'}
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
              <MdAdd className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 truncate uppercase">IEMA IMFA</span>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-1 min-w-0">{navItems.map((item) => renderNavItem(item))}</ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;