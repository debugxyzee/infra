// src/Layout/SuperAdmin/Layout.js
import { useEffect, useState } from 'react';
import Sidebar from '../../Component/SuperAdmin/Sidebar';
import Topbar from '../../Component/SuperAdmin/TopBar';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
      if (isLarge && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [sidebarOpen]);

  // Initialize sidebar state
  useEffect(() => {
    const isLarge = window.innerWidth >= 1024;
    setSidebarOpen(isLarge);
  }, []);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (!isLargeScreen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={handleMenuClick} />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;