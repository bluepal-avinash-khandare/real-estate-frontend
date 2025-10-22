// // import React from 'react';
// // import { Link, useLocation } from 'react-router-dom';

// // const CustomerSidebar = ({ isExpanded }) => {
// //   const location = useLocation();

// //   const menuItems = [
// //     { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
// //     { path: '/properties', icon: 'properties', label: 'Properties' },
// //     { path: '/my-properties', icon: 'my-properties', label: 'My Properties' },
// //     { path: '/reviews', icon: 'reviews', label: 'Reviews' },
// //     { path: '/initiate-payment', icon: 'payment', label: 'Pay' },
// //     { path: '/payment-history', icon: 'history', label: 'Payment History' },
// //     { path: '/request-appointment', icon: 'appointments', label: 'Appointments' },
// //     { path: '/profile', icon: 'profile', label: 'Profile' },
// //   ];

// //   const icons = {
// //     dashboard: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
// //       </svg>
// //     ),
// //     properties: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// //       </svg>
// //     ),
// //     'my-properties': (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
// //       </svg>
// //     ),
// //     reviews: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //       </svg>
// //     ),
// //     payment: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
// //       </svg>
// //     ),
// //     history: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //       </svg>
// //     ),
// //     appointments: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //       </svg>
// //     ),
// //     profile: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //       </svg>
// //     ),
// //   };

// //   return (
// //     <nav className="space-y-1 px-2">
// //       {menuItems.map((item) => (
// //         <Link
// //           key={item.path}
// //           to={item.path}
// //           className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
// //             location.pathname === item.path
// //               ? 'bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white'
// //               : 'text-gray-300 hover:bg-gray-700 hover:text-white'
// //           }`}
// //         >
// //           <div className="flex items-center justify-center w-8">
// //             {icons[item.icon]}
// //           </div>
// //           {isExpanded && (
// //             <span className="ml-3 font-medium">{item.label}</span>
// //           )}
// //         </Link>
// //       ))}
      
// //       {/* Additional Customer Features */}
// //       <div className="pt-4 mt-4 border-t border-gray-700">
// //         <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
// //           Preferences
// //         </div>
// //         <Link
// //           to="/saved-searches"
// //           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
// //         >
// //           <div className="flex items-center justify-center w-8">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-7.682-7.682a4.5 4.5 0 000 6.364z" />
// //             </svg>
// //           </div>
// //           {isExpanded && (
// //             <span className="ml-3 font-medium">Saved Searches</span>
// //           )}
// //         </Link>
// //         <Link
// //           to="/favorites"
// //           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
// //         >
// //           <div className="flex items-center justify-center w-8">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-7.682-7.682a4.5 4.5 0 000 6.364z" />
// //             </svg>
// //           </div>
// //           {isExpanded && (
// //             <span className="ml-3 font-medium">Favorites</span>
// //           )}
// //         </Link>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default CustomerSidebar;

// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const CustomerSidebar = ({ isExpanded }) => {
//   const location = useLocation();

//   const menuItems = [
//     { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
//     { path: '/properties', icon: 'properties', label: 'Properties' },
//     // { path: '/my-properties', icon: 'my-properties', label: 'My Properties' },
//     // { path: '/reviews', icon: 'reviews', label: 'Reviews' },
//     // { path: '/initiate-payment', icon: 'payment', label: 'Pay' },
//     // { path: '/payment-history', icon: 'history', label: 'Payment History' },
//     { path: '/request-appointment', icon: 'appointments', label: 'Appointments' },
//     { path: '/profile', icon: 'profile', label: 'Profile' },
//   ];

//   const icons = {
//     dashboard: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
//       </svg>
//     ),
//     properties: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//       </svg>
//     ),
//     'my-properties': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
//       </svg>
//     ),
//     reviews: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//       </svg>
//     ),
//     payment: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//       </svg>
//     ),
//     history: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//     appointments: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
      
//       <div className="pt-4 mt-4 border-t border-gray-700">
//         <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//           Preferences
//         </div>
//         <Link
//           to="/saved-searches"
//           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
//         >
//           <div className="flex items-center justify-center w-8">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-7.682-7.682a4.5 4.5 0 000 6.364z" />
//             </svg>
//           </div>
//           {isExpanded && (
//             <span className="ml-3 font-medium">Saved Searches</span>
//           )}
//         </Link>
//         {/* <Link
//           to="/favorites"
//           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
//         >
//           <div className="flex items-center justify-center w-8">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-7.682-7.682a4.5 4.5 0 000 6.364z" />
//             </svg>
//           </div>
//           {isExpanded && (
//             <span className="ml-3 font-medium">Favorites</span>
//           )}
//         </Link> */}
//       </div>
//     </nav>
//   );
// };

// export default CustomerSidebar;




import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CustomerSidebar = ({ isExpanded }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/properties', icon: 'properties', label: 'Properties' },
    { path: '/customer/messages', icon: 'messages', label: 'Messages' }, // Added Messages link
    { path: '/request-appointment', icon: 'appointments', label: 'Appointments' },
    { path: '/profile', icon: 'profile', label: 'Profile' },
  ];

  const icons = {
    dashboard: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
      </svg>
    ),
    properties: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    messages: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    appointments: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
          className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
            location.pathname === item.path || 
            (item.path === '/customer/messages' && location.pathname.startsWith('/customer/messages'))
              ? 'bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <div className="flex items-center justify-center w-8">
            {icons[item.icon]}
          </div>
          {isExpanded && (
            <span className="ml-3 font-medium">{item.label}</span>
          )}
        </Link>
      ))}
      
      <div className="pt-4 mt-4 border-t border-gray-700">
        <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Preferences
        </div>
        <Link
          to="/saved-searches"
          className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
        >
          <div className="flex items-center justify-center w-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-7.682-7.682a4.5 4.5 0 000 6.364z" />
            </svg>
          </div>
          {isExpanded && (
            <span className="ml-3 font-medium">Saved Searches</span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default CustomerSidebar;