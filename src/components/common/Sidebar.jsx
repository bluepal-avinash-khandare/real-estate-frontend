
import React, { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useSidebar } from '../../contexts/SidebarContext';
import AdminSidebar from '../role-based/AdminSidebar';
import CustomerSidebar from '../role-based/CustomerSidebar';
import AgentSidebar from '../role-based/AgentSidebar';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const { isVisible, setIsVisible, isExpanded, setIsExpanded, isMobile, toggleSidebar, toggleExpand } = useSidebar();
  const sidebarRef = useRef(null);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isVisible) {
        setIsVisible(false);
      }
    };

    // Add event listener when sidebar is visible
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, setIsVisible]);

  if (!user) return null;

  return (
    <>
      {/* Glassmorphism Sidebar */}
      <aside 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white/80 backdrop-blur-lg text-gray-800 z-40 transition-all duration-300 ease-in-out shadow-2xl ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        } ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        style={{ 
          boxShadow: '2px 0 20px rgba(0, 0, 0, 0.1)',
          zIndex: 40
        }}
      >
        {/* User Profile Section with clean design */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {isExpanded && (
              <div className="ml-3">
                <div className="font-medium text-gray-800">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-4">
          {user.role === 'ADMIN' && <AdminSidebar isExpanded={isExpanded} />}
          {user.role === 'CUSTOMER' && <CustomerSidebar isExpanded={isExpanded} />}
          {user.role === 'AGENT' && <AgentSidebar isExpanded={isExpanded} />}
        </div>

        {/* Footer with clean design */}
        <div className="p-4 border-t border-gray-200 text-center">
          {isExpanded ? (
            <div className="text-xs text-gray-600">
              © 2025 ACR-Estates
            </div>
          ) : (
            <div className="text-xs text-gray-600">
              ACR
            </div>
          )}
        </div>
      </aside>

      {/* Overlay when sidebar is visible on mobile */}
      {isVisible && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsVisible(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
