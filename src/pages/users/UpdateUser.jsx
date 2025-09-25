// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ProfileUpdateForm from '../../components/forms/ProfileUpdateForm';
// import { getUserById, updateUser } from '../../services/userService';

// const UpdateUser = () => {
//   const { id } = useParams();
//   const [initialValues, setInitialValues] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const data = await getUserById(id);
//       setInitialValues(data.data);
//     };
//     fetchUser();
//   }, [id]);

//   const handleSubmit = async (values) => {
//     try {
//       await updateUser(id, values);
//       alert('User updated');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!initialValues) return <p>Loading...</p>;

//   return (
//     <div>
//       <ProfileUpdateForm initialValues={initialValues} onSubmit={handleSubmit} />
//     </div>
//   );
// };

// export default UpdateUser;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileUpdateForm from '../../components/forms/ProfileUpdateForm';
import { getUserById, updateUser } from '../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if id is present and valid
    if (!id || id === 'undefined') {
      toast.error('Invalid user ID');
      navigate('/users');
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getUserById(id);
        
        if (response.success) {
          const userData = response.data;
          setInitialValues({
            name: userData.name,
            email: userData.email,
            phone: userData.phone || '',
            role: userData.role,
            // Add any other fields your form might need
          });
        } else {
          throw new Error(response.message || 'Failed to fetch user');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message || 'An unexpected error occurred');
        toast.error(`Failed to load user: ${err.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    
    try {
      const response = await updateUser(id, values);
      
      if (response.success) {
        toast.success('User updated successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Redirect to users list after successful update
        setTimeout(() => {
          navigate('/users');
        }, 2000);
      } else {
        throw new Error(response.message || 'Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error(`Failed to update user: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#16A085] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Failed to Load User</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white rounded-lg hover:from-[#138871] hover:to-[#1a5f4f] transition-all"
            >
              Try Again
            </button>
            <button 
              onClick={() => navigate('/users')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Real Estate Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU1ZTUiPjwvcmVjdD4KPC9zdmc+')] opacity-30"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Update User</h1>
              <p className="text-gray-600 mt-2">Modify user information and account details</p>
            </div>
            <button 
              onClick={() => navigate('/users')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Users
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Cover Section with Real Estate Background */}
              <div className="h-32 bg-gradient-to-r from-[#16A085] to-[#2C3E50] relative">
                {/* Beach House Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
                ></div>
                
                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-20"></div>
                
                <div className="absolute inset-0 flex items-center px-8">
                  <h2 className="text-xl font-bold text-white">User Information</h2>
                </div>
              </div>
              
              <div className="p-8">
                <ProfileUpdateForm 
                  initialValues={initialValues} 
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Update Guidelines</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#16A085]/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#16A085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">Verify Information</h3>
                    <p className="text-sm text-gray-600 mt-1">Ensure all information is accurate before saving.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#16A085]/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#16A085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">Role Permissions</h3>
                    <p className="text-sm text-gray-600 mt-1">Changing roles will affect user permissions.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-[#16A085]/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#16A085]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-800">Notification Settings</h3>
                    <p className="text-sm text-gray-600 mt-1">User will be notified of important changes.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-800 mb-2">User Activity</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Last Login:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {initialValues?.lastLogin ? new Date(initialValues.lastLogin).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Account Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">Contact support for assistance with user management.</p>
                <button 
                  onClick={() => navigate('/support')}
                  className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;