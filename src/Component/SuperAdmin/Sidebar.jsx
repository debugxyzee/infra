import React, { useState } from "react";
import { MdAdd, MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "../../lib/utils";
import { navItems } from "../../Data/sidebarData";


function Sidebar({ className }) {
  const [expandedItems, setExpandedItems] = useState(["assets"]);

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const renderNavItem = (item, isChild = false) => (
    <li key={item.id}>
      <button
        onClick={() => item.hasDropdown && toggleExpanded(item.id)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors",
          isChild && "ml-6 pl-2",
          item.isActive ? "bg-pink-500 text-white" : "text-gray-600 hover:bg-gray-50"
        )}
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
        <ul className="mt-1 space-y-1">{item.children.map((child) => renderNavItem(child, true))}</ul>
      )}
    </li>
  );

  return (
    <div className={cn("w-64 bg-white border-r border-gray-200 h-screen flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
          <MdAdd className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-gray-900">IEMA Infra</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">{navItems.map((item) => renderNavItem(item))}</ul>
      </nav>
    </div>
  );
}
export default Sidebar;