// // // // import React from 'react';
// // // import { Link, useLocation } from 'react-router-dom';

// // // const AgentSidebar = ({ isExpanded }) => {
// // //   const location = useLocation();

// // //   const menuItems = [
// // //     { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
// // //     { path: '/properties', icon: 'properties', label: 'Properties' },
// // //     { path: '/agent-properties', icon: 'my-properties', label: 'My Properties' },
// // //     { path: '/create-property', icon: 'add-property', label: 'Create Property' },
// // //     { path: '/appointments-requests', icon: 'appointments', label: 'Appointments' },
// // //     { path: '/appointments-report', icon: 'report', label: 'Appointments Report' },
// // //     { path: '/leads', icon: 'leads', label: 'Leads' },
// // //     { path: '/start-chat', icon: 'messages', label: 'Messages' },
// // //     { path: '/profile', icon: 'profile', label: 'Profile' },
// // //   ];

// // //   const icons = {
// // //     dashboard: (
// // //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
// // //       </svg>
// // //     ),
// // //     properties: (
// // //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
// // //       </svg>
// // //     ),
// // //     'my-properties': (
// // //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
// // //       </svg>
// // //     ),
// // //     'add-property': (
// // //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0 0h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
// // //       </svg>
// // //     ),
// // //     appointments: (
// // //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// // //       </svg>
// // //     ),
// // //     report: (
// // //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-2m9 2V9a3 3 0 00-3-3h-1m-4 0a3 3 0 00-3 3v4m0 0v4m0 0h4m-4 0H7m4 0h4m0 0h4m-4 0a3 3 0 01-3-3V5a3 3 0 013-3h1m-4 0a3 3 0 00-3 3v4m0 0v4m0 0h4" />
// // //       </svg>
// // //     ),
// // //     leads: (
// // //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
// // //       </svg>
// // //     ),
// // //     messages: (
// // //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
// // //       </svg>
// // //     ),
// // //     profile: (
// // //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// // //       </svg>
// // //     ),
// // //   };

// // //   return (
// // //     <nav className="space-y-1 px-2">
// // //       {menuItems.map((item) => (
// // //         <Link
// // //           key={item.path}
// // //           to={item.path}
// // //           className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
// // //             location.pathname === item.path
// // //               ? 'bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white'
// // //               : 'text-gray-300 hover:bg-gray-700 hover:text-white'
// // //           }`}
// // //         >
// // //           <div className="flex items-center justify-center w-8">
// // //             {icons[item.icon]}
// // //           </div>
// // //           {isExpanded && (
// // //             <span className="ml-3 font-medium">{item.label}</span>
// // //           )}
// // //         </Link>
// // //       ))}
      
// // //       {/* Additional Agent Features */}
// // //       <div className="pt-4 mt-4 border-t border-gray-700">
// // //         <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
// // //           Tools
// // //         </div>
// // //         <Link
// // //           to="/analytics"
// // //           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
// // //         >
// // //           <div className="flex items-center justify-center w-8">
// // //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// // //             </svg>
// // //           </div>
// // //           {isExpanded && (
// // //             <span className="ml-3 font-medium">Analytics</span>
// // //           )}
// // //         </Link>
// // //         <Link
// // //           to="/marketing"
// // //           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
// // //         >
// // //           <div className="flex items-center justify-center w-8">
// // //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13 9.001 9.001 0 0012.95-11z" />
// // //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0112 0c-2.485 0-4.5 2.015-4.5 4.5v4.5H2.512A9.025 9.025 0 003 12c0 2.485 2.015 4.5 4.5 4.5h4.5v4.512A9.025 9.025 0 007.5 21c2.485 0 4.5-2.015 4.5-4.5v-4.5h4.512A9.025 9.025 0 0021 12c0-2.485-2.015-4.5-4.5-4.5h-4.5V2.512A9.025 9.025 0 0012 0c2.485 0 4.5 2.015 4.5 4.5v4.5h4.512z" />
// // //             </svg>
// // //           </div>
// // //           {isExpanded && (
// // //             <span className="ml-3 font-medium">Marketing</span>
// // //           )}
// // //         </Link>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default AgentSidebar;

// // import React from 'react';
// // import { Link, useLocation } from 'react-router-dom';

// // const AgentSidebar = ({ isExpanded }) => {
// //   const location = useLocation();

// //   const menuItems = [
// //     { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
// //     // { path: '/properties', icon: 'properties', label: 'Properties' },
// //     { path: '/agent-properties', icon: 'my-properties', label: 'My Properties' },
// //     { path: '/create-property', icon: 'add-property', label: 'Create Property' },
// //     { path: '/appointments-requests', icon: 'appointments', label: 'Appointments' },
// //     // { path: '/appointments-report', icon: 'report', label: 'Appointments Report' },
// //     // { path: '/leads', icon: 'leads', label: 'Leads' },
// //     // { path: '/start-chat', icon: 'messages', label: 'Messages' },
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
// //     'add-property': (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0 0h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
// //       </svg>
// //     ),
// //     appointments: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //       </svg>
// //     ),
// //     report: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-2m9 2V9a3 3 0 00-3-3h-1m-4 0a3 3 0 00-3 3v4m0 0v4m0 0h4m-4 0H7m4 0h4m0 0h4m-4 0a3 3 0 01-3-3V5a3 3 0 013-3h1m-4 0a3 3 0 00-3 3v4m0 0v4m0 0h4" />
// //       </svg>
// //     ),
// //     leads: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
// //       </svg>
// //     ),
// //     messages: (
// //       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
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
      
// //       {/* <div className="pt-4 mt-4 border-t border-gray-700">
// //         <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
// //           Tools
// //         </div>
// //         <Link
// //           to="/analytics"
// //           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
// //         >
// //           <div className="flex items-center justify-center w-8">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
// //             </svg>
// //           </div>
// //           {isExpanded && (
// //             <span className="ml-3 font-medium">Analytics</span>
// //           )}
// //         </Link>
// //         <Link
// //           to="/marketing"
// //           className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200"
// //         >
// //           <div className="flex items-center justify-center w-8">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13 9.001 9.001 0 0012.95-11z" />
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0112 0c-2.485 0-4.5 2.015-4.5 4.5v4.5H2.512A9.025 9.025 0 003 12c0 2.485 2.015 4.5 4.5 4.5h4.5v4.512A9.025 9.025 0 007.5 21c2.485 0 4.5-2.015 4.5-4.5v-4.5h4.512A9.025 9.025 0 0021 12c0-2.485-2.015-4.5-4.5-4.5h-4.5V2.512A9.025 9.025 0 0012 0c2.485 0 4.5 2.015 4.5 4.5v4.5h4.512z" />
// //             </svg>
// //           </div>
// //           {isExpanded && (
// //             <span className="ml-3 font-medium">Marketing</span>
// //           )}
// //         </Link>
// //       </div> */}
// //     </nav>
// //   );
// // };

// // export default AgentSidebar;



// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const AgentSidebar = ({ isExpanded }) => {
//   const location = useLocation();

//   const menuItems = [
//     { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
//     { path: '/agent-properties', icon: 'my-properties', label: 'My Properties' },
//     { path: '/create-property', icon: 'add-property', label: 'Create Property' },
//     { path: '/agent/messages', icon: 'messages', label: 'Messages' }, // Added Messages link
//     { path: '/appointments-requests', icon: 'appointments', label: 'Appointments' },
//     { path: '/profile', icon: 'profile', label: 'Profile' },
//   ];

//   const icons = {
//     dashboard: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
//       </svg>
//     ),
//     'my-properties': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
//       </svg>
//     ),
//     'add-property': (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0 0h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//     ),
//     messages: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
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
//             location.pathname === item.path || 
//             (item.path === '/agent/messages' && location.pathname.startsWith('/agent/messages'))
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
//     </nav>
//   );
// };

// export default AgentSidebar;

// c k pandey

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AgentSidebar = ({ isExpanded }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/agent-properties', icon: 'my-properties', label: 'My Properties' },
    { path: '/create-property', icon: 'add-property', label: 'Create Property' },
    { path: '/agent/messages', icon: 'messages', label: 'Messages' },
    { path: '/appointments-requests', icon: 'appointments', label: 'Appointments' },
    { path: '/agent/subscription', icon: 'subscription', label: 'Subscription' }, // Added Subscription
    { path: '/profile', icon: 'profile', label: 'Profile' },
  ];

  const icons = {
    dashboard: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
      </svg>
    ),
    'my-properties': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v-4a1 1 0 00-1-1h-4m-6 0a1 1 0 00-1 1v4m0 0V6a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1m0 0V4a1 1 0 001 1" />
      </svg>
    ),
    'add-property': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0 0h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    subscription: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            (item.path === '/agent/messages' && location.pathname.startsWith('/agent/messages')) ||
            (item.path === '/agent/subscription' && location.pathname.startsWith('/agent/subscription'))
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
    </nav>
  );
};

export default AgentSidebar;