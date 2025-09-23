// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const AdminSidebar = ({ isExpanded }) => {
//   const location = useLocation();

//   const menuItems = [
//     { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
//     { path: '/users', icon: 'users', label: 'Users' },
//     { path: '/users-report', icon: 'report', label: 'Users Report' },
//     { path: '/properties', icon: 'properties', label: 'Properties' },
//     { path: '/profile', icon: 'profile', label: 'Profile' },
//   ];

//   const icons = {
//     dashboard: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
//       </svg>
//     ),
//     users: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 0112 0v1z" />
//       </svg>
//     ),
//     report: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-2m9 2V9a3 3 0 00-3-3h-1m-4 0a3 3 0 00-3 3v4m0 0v4m0 0h4m-4 0H7m4 0h4m0 0h4m-4 0a3 3 0 01-3-3V5a3 3 0 013-3h1m-4 0a3 3 0 00-3 3v4m0 0v4m0 0h4" />
//       </svg>
//     ),
//     properties: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//       </svg>
//     ),
//     profile: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//       </svg>
//     ),
//   };

//   return (
//     <nav className="space-y-1 px-2">
//       {menuItems.map((item) => (
//         <Link
//           key={item.path}
//           to={item.path}
//           className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
//             location.pathname === item.path
//               ? 'bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white'
//               : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//           }`}
//         >
//           <div className="flex items-center justify-center w-8">
//             {icons[item.icon]}
//           </div>
//           {isExpanded && (
//             <span className="ml-3 font-medium">{item.label}</span>
//           )}
//         </Link>
//       ))}
      
//       {/* Additional Admin Features */}
//       <div className="pt-4 mt-4 border-t border-gray-700">
//         <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//           System
//         </div>
//         <Link
//           to="/settings"
//           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
//         >
//           <div className="flex items-center justify-center w-8">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//             </svg>
//           </div>
//           {isExpanded && (
//             <span className="ml-3 font-medium">Settings</span>
//           )}
//         </Link>
//         <Link
//           to="/logout"
//           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
//         >
//           <div className="flex items-center justify-center w-8">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//           </div>
//           {isExpanded && (
//             <span className="ml-3 font-medium">Logout</span>
//           )}
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default AdminSidebar;

// AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isExpanded }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/users', icon: 'users', label: 'Users' },
    { path: '/users-report', icon: 'report', label: 'Users Report' },
    { path: '/properties', icon: 'properties', label: 'Properties' },
    { path: '/profile', icon: 'profile', label: 'Profile' },
  ];

  const icons = {
    dashboard: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
      </svg>
    ),
    users: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 0112 0v1z" />
      </svg>
    ),
    report: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-2m9 2V9a3 3 0 00-3-3h-1m-4 0a3 3 0 00-3 3v4m0 0v4m0 0h4m-4 0H7m4 0h4m0 0h4m-4 0a3 3 0 01-3-3V5a3 3 0 013-3h1m-4 0a3 3 0 00-3 3v4m0 0v4m0 0h4" />
      </svg>
    ),
    properties: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    profile: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  };

  return (
    <nav className="space-y-1 px-2">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`group flex items-center p-3 rounded-lg transition-all duration-200 ${
            location.pathname === item.path
              ? 'bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white shadow-md'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center w-8 text-[#16A085] group-hover:text-white">
            {icons[item.icon]}
          </div>
          {isExpanded && (
            <span className="ml-3 font-medium">{item.label}</span>
          )}
        </Link>
      ))}
      
      <div className="pt-4 mt-4 border-t border-gray-700">
        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          System
        </div>
        <Link
          to="/settings"
          className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
        >
          <div className="flex items-center justify-center w-8 text-[#16A085]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543.826 3.31 2.37 2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          {isExpanded && (
            <span className="ml-3 font-medium">Settings</span>
          )}
        </Link>
        <Link
          to="/logout"
          className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
        >
          <div className="flex items-center justify-center w-8 text-[#16A085]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          {isExpanded && (
            <span className="ml-3 font-medium">Logout</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default AdminSidebar;