// src/Layout/SuperAdmin/Layout.js
import { useEffect, useState } from "react";
import Sidebar from "../../Component/SuperAdmin/Sidebar";
import Topbar from "../../Component/SuperAdmin/Topbar";
import Breadcrumb from "../../Component/SuperAdmin/Breadcrumb";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Initialize sidebar state based on screen size only once
  useEffect(() => {
    const isLarge = window.innerWidth >= 1024;
    setSidebarOpen(isLarge);
    setIsLargeScreen(isLarge);
  }, []);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    // Only auto-close on mobile/tablet screens
    if (!isLargeScreen) {
      setSidebarOpen(false);
    }
  };
  const breadcrumbItems = [
    { text: "Devices", link: "/devices" },
    { text: "Device Details" },
  ];
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={handleMenuClick} />
        <Breadcrumb items={breadcrumbItems} />
      </div>
    </div>
  );
}

export default Layout;
