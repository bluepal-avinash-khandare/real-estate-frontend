// import React, { useContext } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './contexts/AuthContext';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import ForgotPassword from './pages/auth/ForgetPassword';
// import ResetPassword from './pages/auth/ResetPassword';
// import Home from './pages/Home';
// import AdminDashboard from './pages/dashboard/AdminDashboard';
// import CustomerDashboard from './pages/dashboard/CustomerDashboard';
// import AgentDashboard from './pages/dashboard/AgentDashboard';
// import PropertiesList from './pages/properties/PropertiesList';
// import PropertyDetail from './pages/properties/PropertyDetail';
// import MyProperties from './pages/properties/MyProperties';
// import AgentProperties from './pages/properties/AgentProperties';
// import CreateProperty from './pages/properties/CreateProperty';
// import UpdateProperty from './pages/properties/UpdateProperty';
// import ReviewsList from './pages/reviews/ReviewsList';
// import CreateReview from './pages/reviews/CreateReview';
// import UpdateReview from './pages/reviews/UpdateReview';
// import InitiatePayment from './pages/payments/InitiatePayment';
// import PaymentHistory from './pages/payments/PaymentHistory';
// import VerifyPayment from './pages/payments/VerifyPayment';
// import RequestAppointment from './pages/appointments/RequestAppointment';
// import AppointmentsRequests from './pages/appointments/AppointmentsRequests';
// import AppointmentAction from './pages/appointments/AppointmentAction';
// import ConfirmAppointment from './pages/appointments/ConfirmAppointment';
// import AppointmentsReport from './pages/appointments/AppointmentsReport';
// import LeadsList from './pages/leads/LeadsList';
// import StartChat from './pages/messages/StartChat';
// import SendMessage from './pages/messages/SendMessage';
// import MessagesList from './pages/messages/MessagesList';
// import UsersList from './pages/users/UsersList';
// import UserDetail from './pages/users/UserDetail';
// import UpdateUser from './pages/users/UpdateUser';
// import Profile from './pages/users/Profile';
// import UploadProfileImage from './pages/users/UploadProfileImage';
// import UsersReport from './pages/users/UsersReport';
// import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';
// import Sidebar from './components/common/Sidebar';

// const App = () => {
//   const { user } = useContext(AuthContext);

//   const ProtectedRoute = ({ children, roles }) => {
//     if (!user) return <Navigate to="/login" />;
//     if (roles && !roles.includes(user?.role)) return <Navigate to="/" />;
//     return children;
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <main className="flex-1 p-4">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   {user?.role === 'ADMIN' ? (
//                     <AdminDashboard />
//                   ) : user?.role === 'CUSTOMER' ? (
//                     <CustomerDashboard />
//                   ) : (
//                     <AgentDashboard />
//                   )}
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/properties" element={<PropertiesList />} />
//             <Route path="/properties/:id" element={<PropertyDetail />} />
//             <Route
//               path="/my-properties"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <MyProperties />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/agent-properties"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <AgentProperties />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/create-property"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <CreateProperty />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/update-property/:id"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <UpdateProperty />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/reviews" element={<ReviewsList />} />
//             <Route
//               path="/create-review"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <CreateReview />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/update-review/:id"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <UpdateReview />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/initiate-payment"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <InitiatePayment />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/payment-history"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <PaymentHistory />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/verify-payment"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <VerifyPayment />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/request-appointment"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <RequestAppointment />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/appointments-requests"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <AppointmentsRequests />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/appointment-action/:id"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <AppointmentAction />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/confirm-appointment/:id"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER', 'AGENT']}>
//                   <ConfirmAppointment />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/appointments-report"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <AppointmentsReport />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/leads"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <LeadsList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/start-chat"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <StartChat />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/send-message/:threadId"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <SendMessage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/messages/:threadId"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <MessagesList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/users"
//               element={
//                 <ProtectedRoute roles={['ADMIN']}>
//                   <UsersList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/users/:id"
//               element={
//                 <ProtectedRoute roles={['ADMIN']}>
//                   <UserDetail />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/update-user/:id"
//               element={
//                 <ProtectedRoute roles={['ADMIN']}>
//                   <UpdateUser />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/upload-profile-image"
//               element={
//                 <ProtectedRoute>
//                   <UploadProfileImage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/users-report"
//               element={
//                 <ProtectedRoute roles={['ADMIN']}>
//                   <UsersReport />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default App;

//************************************** */

// // App.js
// import React, { useContext, useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './contexts/AuthContext';

// // Import all your page components
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import ForgotPassword from './pages/auth/ForgetPassword';
// import ResetPassword from './pages/auth/ResetPassword';
// import Home from './pages/Home';
// import AdminDashboard from './pages/dashboard/AdminDashboard';
// import CustomerDashboard from './pages/dashboard/CustomerDashboard';
// import AgentDashboard from './pages/dashboard/AgentDashboard';
// import PropertiesList from './pages/properties/PropertiesList';
// import PropertyDetail from './pages/properties/PropertyDetail';
// import MyProperties from './pages/properties/MyProperties';
// import AgentProperties from './pages/properties/AgentProperties';
// import CreateProperty from './pages/properties/CreateProperty';
// import UpdateProperty from './pages/properties/UpdateProperty';
// import ReviewsList from './pages/reviews/ReviewsList';
// import CreateReview from './pages/reviews/CreateReview';
// import UpdateReview from './pages/reviews/UpdateReview';
// import InitiatePayment from './pages/payments/InitiatePayment';
// import PaymentHistory from './pages/payments/PaymentHistory';
// import VerifyPayment from './pages/payments/VerifyPayment';
// import RequestAppointment from './pages/appointments/RequestAppointment';
// import AppointmentsRequests from './pages/appointments/AppointmentsRequests';
// import AppointmentAction from './pages/appointments/AppointmentAction';
// import ConfirmAppointment from './pages/appointments/ConfirmAppointment';
// import AppointmentsReport from './pages/appointments/AppointmentsReport';
// import LeadsList from './pages/leads/LeadsList';
// import StartChat from './pages/messages/StartChat';
// import SendMessage from './pages/messages/SendMessage';
// import MessagesList from './pages/messages/MessagesList';
// import UsersList from './pages/users/UsersList';
// import UserDetail from './pages/users/UserDetail';
// import UpdateUser from './pages/users/UpdateUser';
// import Profile from './pages/users/Profile';
// import UploadProfileImage from './pages/users/UploadProfileImage';
// import UsersReport from './pages/users/UsersReport';

// // Import layout components
// import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';
// import Sidebar from './components/common/Sidebar';

// // Create a separate ProtectedRoute component
// const ProtectedRoute = ({ children, roles }) => {
//   const { isAuthenticated, user } = useContext(AuthContext);
  
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }
  
//   if (roles && user && !roles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }
  
//   return children;
// };

// // Create a RoleBasedRoute component for dashboard routing
// const RoleBasedRoute = () => {
//   const { user } = useContext(AuthContext);
  
//   if (!user) {
//     return <div className="flex items-center justify-center h-screen">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A085] mx-auto mb-4"></div>
//         <p className="text-gray-600">Loading...</p>
//       </div>
//     </div>;
//   }
  
//   switch (user.role) {
//     case 'ADMIN':
//       return <AdminDashboard />;
//     case 'CUSTOMER':
//       return <CustomerDashboard />;
//     case 'AGENT':
//       return <AgentDashboard />;
//     default:
//       return <Navigate to="/unauthorized" replace />;
//   }
// };

// // Create an Unauthorized component
// const Unauthorized = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
//         <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
//         <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
//         <a href="/dashboard" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//           Back to Dashboard
//         </a>
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const { isAuthenticated } = useContext(AuthContext);
//   const [sidebarWidth, setSidebarWidth] = useState(0);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <div className="flex flex-1">
//         <Sidebar />
//         <main 
//           className="flex-1 p-4 md:p-8 transition-all duration-300"
//           style={{ 
//             marginLeft: isAuthenticated ? '0' : '0',
//             paddingLeft: isAuthenticated ? '1rem' : '1rem'
//           }}
//         >
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
            
//             {/* Properties Routes */}
//             <Route path="/properties" element={<PropertiesList />} />
//             <Route path="/properties/:id" element={<PropertyDetail />} />
            
//             {/* Reviews Routes */}
//             <Route path="/reviews" element={<ReviewsList />} />
            
//             {/* Dashboard Route - Role Based */}
//             <Route 
//               path="/dashboard" 
//               element={
//                 <ProtectedRoute>
//                   <RoleBasedRoute />
//                 </ProtectedRoute>
//               } 
//             />
            
//             {/* Customer Routes */}
//             <Route
//               path="/my-properties"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <MyProperties />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/create-review"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <CreateReview />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/update-review/:id"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <UpdateReview />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/initiate-payment"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <InitiatePayment />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/payment-history"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <PaymentHistory />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/verify-payment"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <VerifyPayment />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/request-appointment"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER']}>
//                   <RequestAppointment />
//                 </ProtectedRoute>
//               }
//             />
            
//             {/* Agent Routes */}
//             <Route
//               path="/agent-properties"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <AgentProperties />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/create-property"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <CreateProperty />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/update-property/:id"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <UpdateProperty />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/appointments-requests"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <AppointmentsRequests />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/appointment-action/:id"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <AppointmentAction />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/appointments-report"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <AppointmentsReport />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/leads"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <LeadsList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/start-chat"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <StartChat />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/send-message/:threadId"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <SendMessage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/messages/:threadId"
//               element={
//                 <ProtectedRoute roles={['AGENT']}>
//                   <MessagesList />
//                 </ProtectedRoute>
//               }
//             />
            
//             {/* Admin Routes */}
//             <Route
//               path="/users"
//               element={
//                 <ProtectedRoute roles={['ADMIN']}>
//                   <UsersList />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/users/:id"
//               element={
//                 <ProtectedRoute roles={['ADMIN']}>
//                   <UserDetail />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/update-user/:id"
//               element={
//                 <ProtectedRoute roles={['ADMIN']}>
//                   <UpdateUser />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/users-report"
//               element={
//                 <ProtectedRoute roles={['ADMIN']}>
//                   <UsersReport />
//                 </ProtectedRoute>
//               }
//             />
            
//             {/* Shared Routes */}
//             <Route
//               path="/confirm-appointment/:id"
//               element={
//                 <ProtectedRoute roles={['CUSTOMER', 'AGENT']}>
//                   <ConfirmAppointment />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/upload-profile-image"
//               element={
//                 <ProtectedRoute>
//                   <UploadProfileImage />
//                 </ProtectedRoute>
//               }
//             />
            
//             {/* Unauthorized Route */}
//             <Route path="/unauthorized" element={<Unauthorized />} />
            
//             {/* Fallback Route */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default App;

// App.js
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';

// Import all your page components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgetPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Home from './pages/Home';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import AgentDashboard from './pages/dashboard/AgentDashboard';
import PropertiesList from './pages/properties/PropertiesList';
import PropertyDetail from './pages/properties/PropertyDetail';
import MyProperties from './pages/properties/MyProperties';
import AgentProperties from './pages/properties/AgentProperties';
import CreateProperty from './pages/properties/CreateProperty';
import UpdateProperty from './pages/properties/UpdateProperty';
import ReviewsList from './pages/reviews/ReviewsList';
import CreateReview from './pages/reviews/CreateReview';
import UpdateReview from './pages/reviews/UpdateReview';
import InitiatePayment from './pages/payments/InitiatePayment';
import PaymentHistory from './pages/payments/PaymentHistory';
import VerifyPayment from './pages/payments/VerifyPayment';
import RequestAppointment from './pages/appointments/RequestAppointment';
import AppointmentsRequests from './pages/appointments/AppointmentsRequests';
import AppointmentAction from './pages/appointments/AppointmentAction';
import ConfirmAppointment from './pages/appointments/ConfirmAppointment';
import AppointmentsReport from './pages/appointments/AppointmentsReport';
import LeadsList from './pages/leads/LeadsList';
import StartChat from './pages/messages/StartChat';
import SendMessage from './pages/messages/SendMessage';
import MessagesList from './pages/messages/MessagesList';
import UsersList from './pages/users/UsersList';
import UserDetail from './pages/users/UserDetail';
import UpdateUser from './pages/users/UpdateUser';
import Profile from './pages/users/Profile';
import UploadProfileImage from './pages/users/UploadProfileImage';
import UsersReport from './pages/users/UsersReport';

// Import layout components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';

// Create a separate ProtectedRoute component
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

// Create a RoleBasedRoute component for dashboard routing
const RoleBasedRoute = () => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#16A085] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>;
  }
  
  switch (user.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'CUSTOMER':
      return <CustomerDashboard />;
    case 'AGENT':
      return <AgentDashboard />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

// Create an Unauthorized component
const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
        <a href="/dashboard" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8 transition-all duration-300">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Properties Routes */}
              <Route path="/properties" element={<PropertiesList />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              
              {/* Reviews Routes */}
              <Route path="/reviews" element={<ReviewsList />} />
              
              {/* Dashboard Route - Role Based */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <RoleBasedRoute />
                  </ProtectedRoute>
                } 
              />
              
              {/* Customer Routes */}
              <Route
                path="/my-properties"
                element={
                  <ProtectedRoute roles={['CUSTOMER']}>
                    <MyProperties />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-review"
                element={
                  <ProtectedRoute roles={['CUSTOMER']}>
                    <CreateReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-review/:id"
                element={
                  <ProtectedRoute roles={['CUSTOMER']}>
                    <UpdateReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/initiate-payment"
                element={
                  <ProtectedRoute roles={['CUSTOMER']}>
                    <InitiatePayment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment-history"
                element={
                  <ProtectedRoute roles={['CUSTOMER']}>
                    <PaymentHistory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/verify-payment"
                element={
                  <ProtectedRoute roles={['CUSTOMER']}>
                    <VerifyPayment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/request-appointment"
                element={
                  <ProtectedRoute roles={['CUSTOMER']}>
                    <RequestAppointment />
                  </ProtectedRoute>
                }
              />
              
              {/* Agent Routes */}
              <Route
                path="/agent-properties"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <AgentProperties />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-property"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <CreateProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-property/:id"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <UpdateProperty />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointments-requests"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <AppointmentsRequests />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointment-action/:id"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <AppointmentAction />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointments-report"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <AppointmentsReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leads"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <LeadsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/start-chat"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <StartChat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/send-message/:threadId"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <SendMessage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages/:threadId"
                element={
                  <ProtectedRoute roles={['AGENT']}>
                    <MessagesList />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/users"
                element={
                  <ProtectedRoute roles={['ADMIN']}>
                    <UsersList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <ProtectedRoute roles={['ADMIN']}>
                    <UserDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-user/:id"
                element={
                  <ProtectedRoute roles={['ADMIN']}>
                    <UpdateUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users-report"
                element={
                  <ProtectedRoute roles={['ADMIN']}>
                    <UsersReport />
                  </ProtectedRoute>
                }
              />
              
              {/* Shared Routes */}
              <Route
                path="/confirm-appointment/:id"
                element={
                  <ProtectedRoute roles={['CUSTOMER', 'AGENT']}>
                    <ConfirmAppointment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload-profile-image"
                element={
                  <ProtectedRoute>
                    <UploadProfileImage />
                  </ProtectedRoute>
                }
              />
              
              {/* Unauthorized Route */}
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};

export default App;