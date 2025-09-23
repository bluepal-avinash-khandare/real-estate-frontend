
// import React, { useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../contexts/AuthContext';
// import CustomButton from './CustomButton';

// // Professional Flaticon-style icons
// const Icons = {
//   search: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//       <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#2C3E50" />
//     </svg>
//   ),
//   user: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//       <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#2C3E50" />
//     </svg>
//   ),
//   heart: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//       <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#2C3E50" />
//     </svg>
//   ),
//   home: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//       <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#16A085" />
//     </svg>
//   ),
//   building: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//       <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#2C3E50" />
//     </svg>
//   ),
//   menu: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//       <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="#2C3E50" />
//     </svg>
//   ),
//   close: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#2C3E50" />
//     </svg>
//   ),
//   arrow: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
//       <path d="M7 10l5 5 5-5z" fill="#16A085" />
//     </svg>
//   ),
//   dashboard: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//       <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="#2C3E50" />
//     </svg>
//   ),
//   messages: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//       <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="#2C3E50" />
//     </svg>
//   ),
//   calendar: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//       <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="#2C3E50" />
//     </svg>
//   ),
//   payments: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//       <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" fill="#2C3E50" />
//     </svg>
//   ),
//   users: (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//       <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#2C3E50" />
//     </svg>
//   )
// };

// const Navbar = () => {
//   const { user, signOut } = useContext(AuthContext);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-100">
//       {/* Main navbar */}
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex justify-between items-center">
//           {/* Logo with gradient accent */}
//           <Link to="/" className="flex items-center group">
//             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-shadow">
//               {Icons.home}
//             </div>
//             <div>
//               <span className="text-2xl font-bold bg-gradient-to-r from-[#2C3E50] to-[#16A085] bg-clip-text text-transparent font-sans tracking-tight">
//                 ACR-Estates
//               </span>
//               <div className="text-xs text-gray-500 uppercase tracking-wider">Find Your Dream Home</div>
//             </div>
//           </Link>

//           {/* Desktop Navigation with enhanced styling */}
//           <div className="hidden lg:flex items-center space-x-8">
//             <Link to="/" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
//               Home
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
//             </Link>

//             <div
//               className="relative"
//               onMouseEnter={() => setPropertiesDropdownOpen(true)}
//               onMouseLeave={() => setPropertiesDropdownOpen(false)}
//             >
//               <button className="flex items-center text-gray-700 hover:text-[#16A085] font-medium transition-colors">
//                 Properties {Icons.arrow}
//               </button>

//               {propertiesDropdownOpen && (
//                 <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-3 z-50 border border-gray-100 overflow-hidden">
//                   <Link to="/properties" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                     {Icons.home}
//                     <span className="ml-3">All Properties</span>
//                   </Link>
//                   <Link to="/properties/luxury" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                     {Icons.building}
//                     <span className="ml-3">Luxury Homes</span>
//                   </Link>
//                   <Link to="/properties/new" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                     <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center text-white text-xs mr-3">N</div>
//                     <span>New Developments</span>
//                   </Link>
//                   <Link to="/properties/commercial" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                     <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center text-white text-xs mr-3">C</div>
//                     <span>Commercial</span>
//                   </Link>
//                 </div>
//               )}
//             </div>

//             <Link to="/agents" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
//               Agents
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
//             </Link>

//             <Link to="/services" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
//               Services
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
//             </Link>

//             <Link to="/about" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
//               About
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
//             </Link>

//             <Link to="/contact" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
//               Contact
//               <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
//             </Link>
//           </div>

//           {/* Right side actions with enhanced styling */}
//           <div className="flex items-center space-x-4">
//             {/* Search toggle with gradient */}
//             <button
//               onClick={() => setSearchOpen(!searchOpen)}
//               className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-all duration-300"
//             >
//               {Icons.search}
//             </button>

//             {/* User section with enhanced styling */}
//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                   className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-all duration-300"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center shadow-sm">
//                     {Icons.user}
//                   </div>
//                   <span className="hidden md:block text-gray-700 font-medium">{user.name}</span>
//                 </button>

//                 {profileDropdownOpen && (
//                   <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl py-3 z-50 border border-gray-100 overflow-hidden">
//                     <div className="px-4 py-3 bg-gradient-to-r from-[#16A085]/10 to-[#2C3E50]/10 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-500">Signed in as</p>
//                       <p className="font-semibold text-gray-800 truncate">{user.name}</p>
//                     </div>

//                     {/* <Link to="/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                       {Icons.dashboard}
//                       <span className="ml-3">Dashboard</span>
//                     </Link> */}

                   
// <Link to="/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//   {Icons.dashboard}
//   <span className="ml-3">Dashboard</span>
// </Link>
//                     <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                       {Icons.user}
//                       <span className="ml-3">My Profile</span>
//                     </Link>

//                     {/* Role-specific links */}
//                     {user.role === 'CUSTOMER' && (
//                       <>
//                         <Link to="/my-properties" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                           {Icons.home}
//                           <span className="ml-3">My Properties</span>
//                         </Link>
//                         <Link to="/payment-history" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                           {Icons.payments}
//                           <span className="ml-3">Payment History</span>
//                         </Link>
//                         <Link to="/request-appointment" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                           {Icons.calendar}
//                           <span className="ml-3">Request Appointment</span>
//                         </Link>
//                       </>
//                     )}

//                     {user.role === 'AGENT' && (
//                       <>
//                         <Link to="/agent-properties" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                           {Icons.home}
//                           <span className="ml-3">My Properties</span>
//                         </Link>
//                         <Link to="/appointments-requests" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                           {Icons.calendar}
//                           <span className="ml-3">Appointments</span>
//                         </Link>
//                         <Link to="/leads" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                           {Icons.users}
//                           <span className="ml-3">Leads</span>
//                         </Link>
//                         <Link to="/start-chat" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                           {Icons.messages}
//                           <span className="ml-3">Messages</span>
//                         </Link>
//                       </>
//                     )}

//                     {user.role === 'ADMIN' && (
//                       <>
//                         <Link to="/users" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                           {Icons.users}
//                           <span className="ml-3">Manage Users</span>
//                         </Link>
//                         <Link to="/users-report" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
//                           {Icons.dashboard}
//                           <span className="ml-3">Reports</span>
//                         </Link>
//                       </>
//                     )}

//                     <div className="border-t border-gray-100 my-2"></div>
//                     <button
//                       onClick={() => {
//                         signOut();
//                         setProfileDropdownOpen(false);
//                       }}
//                       className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                       </svg>
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="hidden md:flex items-center space-x-3">
//                 <Link
//                   to="/login"
//                   className="inline-block px-6 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium
//              hover:bg-gradient-to-r hover:from-[#16A085] hover:to-[#2C3E50] hover:text-white
//              hover:shadow-md transition-all duration-300"
//                 >
//                   Log in
//                 </Link>

//                 <Link
//                   to="/register"
//                   className="inline-block px-6 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium
//              hover:bg-gradient-to-r hover:from-[#16A085] hover:to-[#2C3E50] hover:text-white
//              hover:shadow-md transition-all duration-300"
//                 >
//                   Sign up
//                 </Link>


//               </div>
//             )}

//             {/* Mobile menu toggle with enhanced styling */}
//             <button
//               className="lg:hidden p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-all duration-300"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? Icons.close : Icons.menu}
//             </button>
//           </div>
//         </div>

//         {/* Search bar with enhanced styling */}
//         {searchOpen && (
//           <div className="mt-4 pb-4">
//             <div className="relative max-w-xl mx-auto">
//               <input
//                 type="text"
//                 placeholder="Search properties, locations, agents..."
//                 className="w-full py-3 px-4 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-transparent shadow-sm"
//               />
//               <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white p-2.5 rounded-xl hover:shadow-md transition-all duration-300">
//                 {Icons.search}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mobile menu with enhanced styling */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100">
//           <div className="container mx-auto px-4 py-4">
//             <div className="flex flex-col space-y-4">
//               <Link to="/" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
//                 Home
//               </Link>

//               <div className="py-2 border-b border-gray-100">
//                 <p className="text-gray-700 font-medium mb-3">Properties</p>
//                 <div className="pl-4 space-y-3">
//                   <Link to="/properties" className="block text-gray-600 hover:text-[#16A085] transition-colors flex items-center py-2">
//                     {Icons.home}
//                     <span className="ml-3">All Properties</span>
//                   </Link>
//                   <Link to="/properties/luxury" className="block text-gray-600 hover:text-[#16A085] transition-colors flex items-center py-2">
//                     {Icons.building}
//                     <span className="ml-3">Luxury Homes</span>
//                   </Link>
//                   <Link to="/properties/new" className="block text-gray-600 hover:text-[#16A085] transition-colors flex items-center py-2">
//                     <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center text-white text-xs mr-3">N</div>
//                     <span>New Developments</span>
//                   </Link>
//                   <Link to="/properties/commercial" className="block text-gray-600 hover:text-[#16A085] transition-colors flex items-center py-2">
//                     <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center text-white text-xs mr-3">C</div>
//                     <span>Commercial</span>
//                   </Link>
//                 </div>
//               </div>

//               <Link to="/agents" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
//                 Agents
//               </Link>

//               <Link to="/services" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
//                 Services
//               </Link>

//               <Link to="/about" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
//                 About
//               </Link>

//               <Link to="/contact" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
//                 Contact
//               </Link>

//               {!user && (
//                 <div className="flex flex-col space-y-3 pt-2">
//                   <Link to="/login" className="text-center py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors font-medium">
//                     Login
//                   </Link>
//                   <Link to="/register">
//                     <CustomButton className="w-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:shadow-md text-white py-3 rounded-xl font-medium transition-all duration-300 ">
//                       Register
//                     </CustomButton>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// Navbar.jsx
// Navbar.jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useSidebar } from '../../contexts/SidebarContext';
import CustomButton from './CustomButton';

// Professional Flaticon-style icons
const Icons = {
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#2C3E50" />
    </svg>
  ),
  user: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#2C3E50" />
    </svg>
  ),
  heart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#2C3E50" />
    </svg>
  ),
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#16A085" />
    </svg>
  ),
  building: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="#2C3E50" />
    </svg>
  ),
  menu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="#2C3E50" />
    </svg>
  ),
  close: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#2C3E50" />
    </svg>
  ),
  arrow: (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
      <path d="M7 10l5 5 5-5z" fill="#16A085" />
    </svg>
  ),
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="#2C3E50" />
    </svg>
  ),
  messages: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="#2C3E50" />
    </svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill="#2C3E50" />
    </svg>
  ),
  payments: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" fill="#2C3E50" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#2C3E50" />
    </svg>
  ),
  sidebar: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" fill="#2C3E50" />
    </svg>
  )
};

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  const { isVisible, toggleSidebar, isExpanded, toggleExpand } = useSidebar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-100">
      {/* Main navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo with gradient accent */}
          <div className="flex items-center">
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="mr-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {Icons.sidebar}
            </button>
            
            <Link to="/" className="flex items-center group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center mr-3 shadow-md group-hover:shadow-lg transition-shadow">
                {Icons.home}
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#2C3E50] to-[#16A085] bg-clip-text text-transparent font-sans tracking-tight">
                  ACR-Estates
                </span>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Find Your Dream Home</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setPropertiesDropdownOpen(true)}
              onMouseLeave={() => setPropertiesDropdownOpen(false)}
            >
              <button className="flex items-center text-gray-700 hover:text-[#16A085] font-medium transition-colors">
                Properties {Icons.arrow}
              </button>

              {propertiesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-3 z-50 border border-gray-100 overflow-hidden">
                  <Link to="/properties" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                    {Icons.home}
                    <span className="ml-3">All Properties</span>
                  </Link>
                  <Link to="/properties/luxury" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                    {Icons.building}
                    <span className="ml-3">Luxury Homes</span>
                  </Link>
                  <Link to="/properties/new" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center text-white text-xs mr-3">N</div>
                    <span>New Developments</span>
                  </Link>
                  <Link to="/properties/commercial" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center text-white text-xs mr-3">C</div>
                    <span>Commercial</span>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/agents" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
              Agents
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/services" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/about" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/contact" className="relative text-gray-700 hover:text-[#16A085] font-medium transition-all duration-300 group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16A085] to-[#2C3E50] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right side actions with enhanced styling */}
          <div className="flex items-center space-x-4">
            {/* Search toggle with gradient */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-all duration-300"
            >
              {Icons.search}
            </button>

            {/* User section with enhanced styling */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#16A085] to-[#2C3E50] flex items-center justify-center shadow-sm">
                    {Icons.user}
                  </div>
                  <span className="hidden md:block text-gray-700 font-medium">{user.name}</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl py-3 z-50 border border-gray-100 overflow-hidden">
                    <div className="px-4 py-3 bg-gradient-to-r from-[#16A085]/10 to-[#2C3E50]/10 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-500">Signed in as</p>
                      <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                    </div>

                    <Link to="/dashboard" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                      {Icons.dashboard}
                      <span className="ml-3">Dashboard</span>
                    </Link>
                    <Link to="/profile" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                      {Icons.user}
                      <span className="ml-3">My Profile</span>
                    </Link>

                    {/* Role-specific links */}
                    {user.role === 'CUSTOMER' && (
                      <>
                        <Link to="/my-properties" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                          {Icons.home}
                          <span className="ml-3">My Properties</span>
                        </Link>
                        <Link to="/payment-history" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                          {Icons.payments}
                          <span className="ml-3">Payment History</span>
                        </Link>
                        <Link to="/request-appointment" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                          {Icons.calendar}
                          <span className="ml-3">Request Appointment</span>
                        </Link>
                      </>
                    )}

                    {user.role === 'AGENT' && (
                      <>
                        <Link to="/agent-properties" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                          {Icons.home}
                          <span className="ml-3">My Properties</span>
                        </Link>
                        <Link to="/appointments-requests" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                          {Icons.calendar}
                          <span className="ml-3">Appointments</span>
                        </Link>
                        <Link to="/leads" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                          {Icons.users}
                          <span className="ml-3">Leads</span>
                        </Link>
                        <Link to="/start-chat" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                          {Icons.messages}
                          <span className="ml-3">Messages</span>
                        </Link>
                      </>
                    )}

                    {user.role === 'ADMIN' && (
                      <>
                        <Link to="/users" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                          {Icons.users}
                          <span className="ml-3">Manage Users</span>
                        </Link>
                        <Link to="/users-report" className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center">
                          {Icons.dashboard}
                          <span className="ml-3">Reports</span>
                        </Link>
                      </>
                    )}

                    <div className="border-t border-gray-100 my-2"></div>
                    <button
                      onClick={() => {
                        signOut();
                        setProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="inline-block px-6 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium
             hover:bg-gradient-to-r hover:from-[#16A085] hover:to-[#2C3E50] hover:text-white
             hover:shadow-md transition-all duration-300"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="inline-block px-6 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium
             hover:bg-gradient-to-r hover:from-[#16A085] hover:to-[#2C3E50] hover:text-white
             hover:shadow-md transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile menu toggle with enhanced styling */}
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? Icons.close : Icons.menu}
            </button>
          </div>
        </div>

        {/* Search bar with enhanced styling */}
        {searchOpen && (
          <div className="mt-4 pb-4">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search properties, locations, agents..."
                className="w-full py-3 px-4 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-transparent shadow-sm"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white p-2.5 rounded-xl hover:shadow-md transition-all duration-300">
                {Icons.search}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu with enhanced styling */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
                Home
              </Link>

              <div className="py-2 border-b border-gray-100">
                <p className="text-gray-700 font-medium mb-3">Properties</p>
                <div className="pl-4 space-y-3">
                  <Link to="/properties" className="block text-gray-600 hover:text-[#16A085] transition-colors flex items-center py-2">
                    {Icons.home}
                    <span className="ml-3">All Properties</span>
                  </Link>
                  <Link to="/properties/luxury" className="block text-gray-600 hover:text-[#16A085] transition-colors flex items-center py-2">
                    {Icons.building}
                    <span className="ml-3">Luxury Homes</span>
                  </Link>
                  <Link to="/properties/new" className="block text-gray-600 hover:text-[#16A085] transition-colors flex items-center py-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center text-white text-xs mr-3">N</div>
                    <span>New Developments</span>
                  </Link>
                  <Link to="/properties/commercial" className="block text-gray-600 hover:text-[#16A085] transition-colors flex items-center py-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] flex items-center justify-center text-white text-xs mr-3">C</div>
                    <span>Commercial</span>
                  </Link>
                </div>
              </div>

              <Link to="/agents" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
                Agents
              </Link>

              <Link to="/services" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
                Services
              </Link>

              <Link to="/about" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
                About
              </Link>

              <Link to="/contact" className="text-gray-700 hover:text-[#16A085] font-medium py-3 border-b border-gray-100 transition-colors">
                Contact
              </Link>

              {!user && (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link to="/login" className="text-center py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-[#16A085]/10 hover:to-[#2C3E50]/10 transition-colors font-medium">
                    Login
                  </Link>
                  <Link to="/register">
                    <CustomButton className="w-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:shadow-md text-white py-3 rounded-xl font-medium transition-all duration-300 ">
                      Register
                    </CustomButton>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;