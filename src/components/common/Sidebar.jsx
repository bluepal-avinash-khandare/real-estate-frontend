import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AdminSidebar from '../role-based/AdminSidebar';
import CustomerSidebar from '../role-based/CustomerSidebar';
import AgentSidebar from '../role-based/AgentSidebar';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(true);

  if (!user) return null;

  return (
    <aside className={`bg-gradient-to-b from-[#1a1a1a] to-[#2C3E50] text-white h-screen transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}>
      {/* Logo and Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isExpanded && (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="white"/>
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold">ACR-Estates</span>
              <div className="text-xs text-gray-400">{user.role}</div>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
          </div>
          {isExpanded && (
            <div className="ml-3">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-gray-400">{user.email}</div>
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

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-center">
        {isExpanded ? (
          <div className="text-xs text-gray-400">
            © 2025 ACR-Estates
          </div>
        ) : (
          <div className="text-xs text-gray-400">
            ACR
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;