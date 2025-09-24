
// import React, { useContext, useRef, useEffect } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import { useSidebar } from '../../contexts/SidebarContext';
// import AdminSidebar from '../role-based/AdminSidebar';
// import CustomerSidebar from '../role-based/CustomerSidebar';
// import AgentSidebar from '../role-based/AgentSidebar';

// const Sidebar = () => {
//   const { user } = useContext(AuthContext);
//   const { isVisible, setIsVisible, isExpanded, setIsExpanded, isMobile, toggleSidebar, toggleExpand } = useSidebar();
//   const sidebarRef = useRef(null);
//   const overlayRef = useRef(null);

//   // Handle clicks outside the sidebar
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Check if sidebar is visible
//       if (!isVisible) return;
      
//       // Check if click is on sidebar or its children
//       if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
//         return;
//       }
      
//       // Check if click is on the overlay (for mobile)
//       if (overlayRef.current && overlayRef.current.contains(event.target)) {
//         return;
//       }
      
//       // If we get here, the click was outside both sidebar and overlay
//       setIsVisible(false);
//     };

//     // Add event listener with a slight delay to avoid immediate closing
//     const timer = setTimeout(() => {
//       document.addEventListener('mousedown', handleClickOutside);
//       document.addEventListener('touchstart', handleClickOutside);
//     }, 100);

//     return () => {
//       clearTimeout(timer);
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('touchstart', handleClickOutside);
//     };
//   }, [isVisible, setIsVisible]);

//   if (!user) return null;

//   return (
//     <>
//       {/* Glassmorphism Sidebar */}
//       <aside 
//         ref={sidebarRef}
//         className={`fixed top-0 left-0 h-full bg-white/80 backdrop-blur-lg text-gray-800 z-40 transition-all duration-300 ease-in-out shadow-2xl ${
//           isVisible ? 'translate-x-0' : '-translate-x-full'
//         } ${
//           isExpanded ? 'w-64' : 'w-20'
//         }`}
//         style={{ 
//           boxShadow: '2px 0 20px rgba(0, 0, 0, 0.1)',
//           zIndex: 40
//         }}
//       >
//         {/* User Profile Section with clean design */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex items-center">
//             <div className="relative">
//               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center shadow-md">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </div>
//               <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
//             </div>
//             {isExpanded && (
//               <div className="ml-3">
//                 <div className="font-medium text-gray-800">{user.name}</div>
//                 <div className="text-sm text-gray-600">{user.email}</div>
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

//         {/* Footer with clean design */}
//         <div className="p-4 border-t border-gray-200 text-center">
//           {isExpanded ? (
//             <div className="text-xs text-gray-600">
//               © 2025 ACR-Estates
//             </div>
//           ) : (
//             <div className="text-xs text-gray-600">
//               ACR
//             </div>
//           )}
//         </div>
//       </aside>

//       {/* Overlay when sidebar is visible on mobile */}
//       {isVisible && isMobile && (
//         <div 
//           ref={overlayRef}
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setIsVisible(false)}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;

// import React, { useContext, useRef, useEffect } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import { useSidebar } from '../../contexts/SidebarContext';
// import AdminSidebar from '../role-based/AdminSidebar';
// import CustomerSidebar from '../role-based/CustomerSidebar';
// import AgentSidebar from '../role-based/AgentSidebar';

// const Sidebar = () => {
//   const { user } = useContext(AuthContext);
//   const { isVisible, setIsVisible, isExpanded, setIsExpanded, isMobile, toggleSidebar, toggleExpand } = useSidebar();
//   const sidebarRef = useRef(null);
//   const overlayRef = useRef(null);

//   // Handle clicks outside the sidebar
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!isVisible) return;
      
//       if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
//         return;
//       }
      
//       if (overlayRef.current && overlayRef.current.contains(event.target)) {
//         return;
//       }
      
//       setIsVisible(false);
//     };

//     const timer = setTimeout(() => {
//       document.addEventListener('mousedown', handleClickOutside);
//       document.addEventListener('touchstart', handleClickOutside);
//     }, 100);

//     return () => {
//       clearTimeout(timer);
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('touchstart', handleClickOutside);
//     };
//   }, [isVisible, setIsVisible]);

//   // Add body padding when sidebar is open on desktop
//   useEffect(() => {
//     if (isVisible && !isMobile) {
//       document.body.classList.add('sidebar-open');
//       if (isExpanded) {
//         document.body.classList.add('sidebar-expanded');
//         document.body.classList.remove('sidebar-collapsed');
//       } else {
//         document.body.classList.add('sidebar-collapsed');
//         document.body.classList.remove('sidebar-expanded');
//       }
//     } else {
//       document.body.classList.remove('sidebar-open', 'sidebar-expanded', 'sidebar-collapsed');
//     }

//     return () => {
//       document.body.classList.remove('sidebar-open', 'sidebar-expanded', 'sidebar-collapsed');
//     };
//   }, [isVisible, isExpanded, isMobile]);

//   if (!user) return null;

//   return (
//     <>
//       {/* Premium Sidebar with proper positioning */}
//       <aside 
//         ref={sidebarRef}
//         className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 z-40 transition-all duration-500 ease-in-out shadow-2xl ${
//           isVisible ? 'translate-x-0' : '-translate-x-full'
//         } ${
//           isExpanded ? 'w-72' : 'w-20'
//         }`}
//         style={{ 
//           boxShadow: '0 0 40px rgba(0, 0, 0, 0.3), -10px 0 30px rgba(0, 0, 0, 0.2)',
//           backdropFilter: 'blur(10px)',
//           borderRight: '1px solid rgba(255, 255, 255, 0.1)'
//         }}
//       >
//         {/* Premium User Profile Section */}
//         <div className="p-6 border-b border-gray-700 relative overflow-hidden">
//           {/* Decorative accent */}
//           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#16A085]/20 to-transparent rounded-full -mr-16 -mt-16"></div>
          
//           <div className="flex items-center relative z-10">
//             <div className="relative">
//               <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center shadow-lg">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                 </svg>
//               </div>
//               <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
//             </div>
            
//             {isExpanded && (
//               <div className="ml-4">
//                 <div className="font-semibold text-lg text-white">{user.name}</div>
//                 <div className="text-sm text-gray-300 flex items-center">
//                   <span className="inline-block w-2 h-2 rounded-full bg-[#16A085] mr-2"></span>
//                   {user.role}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Navigation Menu with premium styling */}
//         <div className="flex-1 overflow-y-auto py-6 px-4">
//           {user.role === 'ADMIN' && <AdminSidebar isExpanded={isExpanded} />}
//           {user.role === 'CUSTOMER' && <CustomerSidebar isExpanded={isExpanded} />}
//           {user.role === 'AGENT' && <AgentSidebar isExpanded={isExpanded} />}
//         </div>

//         {/* Premium Footer */}
//         <div className="p-6 border-t border-gray-700 text-center relative">
//           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
//           <div className="relative z-10">
//             {isExpanded ? (
//               <div className="text-xs text-gray-400">
//                 © 2025 ACR-Estates<br />
//                 <span className="text-[#16A085]">Luxury Real Estate</span>
//               </div>
//             ) : (
//               <div className="text-xs text-gray-400">
//                 ACR
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>

//       {/* Premium Overlay when sidebar is visible on mobile */}
//       {isVisible && isMobile && (
//         <div 
//           ref={overlayRef}
//           className="fixed inset-0 bg-black bg-opacity-70 z-30 backdrop-blur-sm"
//           onClick={() => setIsVisible(false)}
//         ></div>
//       )}

//       {/* Global styles for body padding */}
//       <style jsx global>{`
//         body.sidebar-open {
//           padding-left: 18rem;
//           transition: padding-left 0.3s ease;
//         }
//         body.sidebar-open.sidebar-collapsed {
//           padding-left: 5rem;
//         }
//         @media (max-width: 1024px) {
//           body.sidebar-open {
//             padding-left: 0;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Sidebar;

// Sidebar.js
import React, { useContext, useRef, useEffect, useState } from 'react';
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
  const [hoveredItem, setHoveredItem] = useState(null);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isVisible) return;
      
      if (sidebarRef.current && sidebarRef.current.contains(event.target)) {
        return;
      }
      
      if (overlayRef.current && overlayRef.current.contains(event.target)) {
        return;
      }
      
      setIsVisible(false);
    };

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
      {/* Premium Sidebar with proper positioning */}
      <aside 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 z-40 transition-all duration-500 ease-in-out shadow-2xl ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        } ${
          isExpanded ? 'w-72' : 'w-20'
        }`}
        style={{ 
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.3), -10px 0 30px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Premium User Profile Section */}
        <div className="p-6 border-b border-gray-700 relative overflow-hidden">
          {/* Decorative accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#16A085]/20 to-transparent rounded-full -mr-16 -mt-16"></div>
          
          <div className="flex items-center relative z-10">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            
            {isExpanded && (
              <div className="ml-4">
                <div className="font-semibold text-lg text-white">{user.name}</div>
                <div className="text-sm text-gray-300 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#16A085] mr-2"></span>
                  {user.role}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu with premium styling */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          {user.role === 'ADMIN' && <AdminSidebar isExpanded={isExpanded} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />}
          {user.role === 'CUSTOMER' && <CustomerSidebar isExpanded={isExpanded} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />}
          {user.role === 'AGENT' && <AgentSidebar isExpanded={isExpanded} hoveredItem={hoveredItem} setHoveredItem={setHoveredItem} />}
        </div>

        {/* Premium Footer */}
        <div className="p-6 border-t border-gray-700 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          <div className="relative z-10">
            {isExpanded ? (
              <div className="text-xs text-gray-400">
                © 2025 ACR-Estates<br />
                <span className="text-[#16A085]">Luxury Real Estate</span>
              </div>
            ) : (
              <div className="text-xs text-gray-400">
                ACR
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Premium Overlay when sidebar is visible on mobile */}
      {isVisible && isMobile && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 bg-black bg-opacity-70 z-30 backdrop-blur-sm"
          onClick={() => setIsVisible(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
