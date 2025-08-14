// src/Layout/SuperAdmin/Layout.js
import { useEffect, useState } from 'react';
import Sidebar from '../../Component/SuperAdmin/Sidebar';
import Topbar from '../../Component/SuperAdmin/Topbar';
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);
      // On large screens, sidebar should be open by default
      // On small screens, sidebar should be closed by default
      if (isLarge && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [sidebarOpen]);

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const isLarge = window.innerWidth >= 1024;
    setSidebarOpen(isLarge);
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={handleMenuClick} />
        
      </div>
    </div>
  );
}

export default Layout;