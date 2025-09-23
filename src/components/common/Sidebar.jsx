// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import AdminSidebar from '../role-based/AdminSidebar';
// import CustomerSidebar from '../role-based/CustomerSidebar';
// import AgentSidebar from '../role-based/AgentSidebar';

// const Sidebar = () => {
//   const { user } = useContext(AuthContext);
//   const [isExpanded, setIsExpanded] = useState(true);

//   if (!user) return null;

//   return (
//     <aside className={`bg-gradient-to-b from-[#1a1a1a] to-[#2C3E50] text-white h-screen transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'}`}>
//       {/* Logo and Toggle Button */}
//       <div className="flex items-center justify-between p-4 border-b border-gray-700">
//         {isExpanded && (
//           <div className="flex items-center">
//             <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center mr-3">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                 <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="white"/>
//               </svg>
//             </div>
//             <div>
//               <span className="text-xl font-bold">ACR-Estates</span>
//               <div className="text-xs text-gray-400">{user.role}</div>
//             </div>
//           </div>
//         )}
//         <button 
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>

//       {/* User Profile Section */}
//       <div className="p-4 border-b border-gray-700">
//         <div className="flex items-center">
//           <div className="relative">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
//           </div>
//           {isExpanded && (
//             <div className="ml-3">
//               <div className="font-medium">{user.name}</div>
//               <div className="text-sm text-gray-400">{user.email}</div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <div className="flex-1 overflow-y-auto py-4">
//         {user.role === 'ADMIN' && <AdminSidebar isExpanded={isExpanded} />}
//         {user.role === 'CUSTOMER' && <CustomerSidebar isExpanded={isExpanded} />}
//         {user.role === 'AGENT' && <AgentSidebar isExpanded={isExpanded} />}
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-gray-700 text-center">
//         {isExpanded ? (
//           <div className="text-xs text-gray-400">
//             © 2025 ACR-Estates
//           </div>
//         ) : (
//           <div className="text-xs text-gray-400">
//             ACR
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

// // Sidebar.jsx
// import React, { useContext, useState, useEffect } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import AdminSidebar from '../role-based/AdminSidebar';
// import CustomerSidebar from '../role-based/CustomerSidebar';
// import AgentSidebar from '../role-based/AgentSidebar';

// const Sidebar = () => {
//   const { user } = useContext(AuthContext);
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [isVisible, setIsVisible] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Check if screen is mobile size
//   useEffect(() => {
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setIsVisible(true);
//       }
//     };

//     checkIsMobile();
//     window.addEventListener('resize', checkIsMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkIsMobile);
//     };
//   }, []);

//   if (!user) return null;

//   return (
//     <>
//       {/* Floating Toggle Button */}
//       <button
//         onClick={() => setIsVisible(!isVisible)}
//         className={`fixed left-4 top-4 z-50 p-3 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white shadow-lg transition-all duration-300 transform hover:scale-105 ${isVisible ? 'translate-x-64' : 'translate-x-0'}`}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Sidebar */}
//       <aside 
//         className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#1a1a1a] to-[#2C3E50] text-white z-40 transition-all duration-300 ease-in-out shadow-2xl ${isVisible ? 'translate-x-0' : '-translate-x-full'} ${isExpanded ? 'w-64' : 'w-20'}`}
//         style={{ 
//           boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
//           zIndex: 40
//         }}
//       >
//         {/* Logo and Toggle Button */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           {isExpanded && (
//             <div className="flex items-center">
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center mr-3 shadow-md">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//                   <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="white"/>
//                 </svg>
//               </div>
//               <div>
//                 <span className="text-xl font-bold">ACR-Estates</span>
//                 <div className="text-xs text-gray-400">{user.role}</div>
//               </div>
//             </div>
//           )}
//           <button 
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>

//         {/* User Profile Section */}
//         <div className="p-4 border-b border-gray-700">
//           <div className="flex items-center">
//             <div className="relative">
//               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center shadow-md">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </div>
//               <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
//             </div>
//             {isExpanded && (
//               <div className="ml-3">
//                 <div className="font-medium">{user.name}</div>
//                 <div className="text-sm text-gray-400">{user.email}</div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <div className="flex-1 overflow-y-auto py-4">
//           {user.role === 'ADMIN' && <AdminSidebar isExpanded={isExpanded} />}
//           {user.role === 'CUSTOMER' && <CustomerSidebar isExpanded={isExpanded} />}
//           {user.role === 'AGENT' && <AgentSidebar isExpanded={isExpanded} />}
//         </div>

//         {/* Footer */}
//         <div className="p-4 border-t border-gray-700 text-center">
//           {isExpanded ? (
//             <div className="text-xs text-gray-400">
//               © 2025 ACR-Estates
//             </div>
//           ) : (
//             <div className="text-xs text-gray-400">
//               ACR
//             </div>
//           )}
//         </div>
//       </aside>

//       {/* Overlay when sidebar is visible on mobile */}
//       {isVisible && isMobile && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setIsVisible(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;


// Sidebar.jsx
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
  const overlayRef = useRef(null);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if sidebar is visible
      if (!isVisible) return;
      
      // Check if click is on sidebar or its children
      if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
        return;
      }
      
      // Check if click is on the overlay (for mobile)
      if (overlayRef.current && overlayRef.current.contains(event.target)) {
        return;
      }
      
      // If we get here, the click was outside both sidebar and overlay
      setIsVisible(false);
    };

    // Add event listener with a slight delay to avoid immediate closing
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
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
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsVisible(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
