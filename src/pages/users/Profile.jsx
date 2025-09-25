// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import ProfileUpdateForm from '../../components/forms/ProfileUpdateForm';
// import { updateUser, getUserProfileImage, getUserProfile, uploadProfileImage } from '../../services/userService';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const { user, updateUser: updateAuthUser } = useContext(AuthContext);
//   const [userProfile, setUserProfile] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!user) return;
      
//       try {
//         setLoading(true);
//         const profileData = await getUserProfile();
//         setUserProfile(profileData);
        
//         try {
//           const imageUrl = await getUserProfileImage(); // No user.id
//           setProfileImage(imageUrl || 'https://via.placeholder.com/150');
//         } catch (error) {
//           console.error('Failed to load profile image:', error);
//           setProfileImage('https://via.placeholder.com/150');
//         }
//       } catch (error) {
//         toast.error('Failed to load profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user]);

//   const handleSubmit = async (values) => {
//     try {
//       const updatedUser = await updateUser(user.id, values);
//       updateAuthUser(updatedUser);
//       setUserProfile(updatedUser);
//       setIsEditModalOpen(false);
//       toast.success('Profile updated');
//     } catch (error) {
//       toast.error('Update failed');
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       toast.error('No file selected');
//       return;
//     }
//     try {
//       setUploading(true);
//       await uploadProfileImage(file); // No user.id
//       const imageUrl = await getUserProfileImage(); // Fetch updated URL
//       setProfileImage(imageUrl || 'https://via.placeholder.com/150');
//       toast.success('Image updated');
//     } catch (error) {
//       console.error('Upload failed:', error.response?.data || error.message);
//       toast.error('Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };
  

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p>Please log in to view your profile</p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] h-48 relative">
//             <div className="absolute -bottom-16 left-8">
//               <div className="relative group">
//                 <img 
//                   src={profileImage} 
//                   alt="Profile" 
//                   className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
//                 />
//                 <button 
//                   onClick={() => document.getElementById('image-upload').click()}
//                   className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                   disabled={uploading}
//                 >
//                   {uploading ? (
//                     <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   )}
//                 </button>
//                 <input 
//                   id="image-upload"
//                   type="file" 
//                   className="hidden" 
//                   onChange={handleImageUpload}
//                   accept="image/jpeg,image/png"/>
//               </div>
//             </div>
//           </div>
//           <div className="pt-20 px-8 pb-8">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">{userProfile?.name}</h1>
//                 <p className="text-gray-600">{userProfile?.email}</p>
//                 <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                   {userProfile?.role}
//                 </span>
//               </div>
//               <button 
//                 onClick={() => setIsEditModalOpen(true)}
//                 className="px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138875] transition-colors flex items-center"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
//                 </svg>
//                 Edit Profile
//               </button>
//             </div>
//             <div className="mt-8 bg-gray-50 p-6 rounded-lg">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Name</p>
//                   <p className="font-medium">{userProfile?.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className="font-medium">{userProfile?.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className="font-medium">{userProfile?.phone || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Role</p>
//                   <p className="font-medium">{userProfile?.role}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isEditModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold">Edit Profile</h3>
//                 <button 
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <ProfileUpdateForm 
//                 initialValues={userProfile} 
//                 onSubmit={handleSubmit} 
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileUpdateForm from '../../components/forms/ProfileUpdateForm';
import { updateUser, getUserProfileImage, getUserProfile, uploadProfileImage } from '../../services/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const { user, updateUser: updateAuthUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageHover, setImageHover] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const profileData = await getUserProfile();
        setUserProfile(profileData);
        
        try {
          const imageUrl = await getUserProfileImage();
          setProfileImage(imageUrl || 'https://via.placeholder.com/150');
        } catch (error) {
          console.error('Failed to load profile image:', error);
          setProfileImage('https://via.placeholder.com/150');
        }
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (values) => {
    try {
      const updatedUser = await updateUser(user.id, values);
      updateAuthUser(updatedUser);
      setUserProfile(updatedUser);
      setIsEditModalOpen(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Update failed. Please try again.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('No file selected');
      return;
    }
    
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    try {
      setUploading(true);
      await uploadProfileImage(file);
      const imageUrl = await getUserProfileImage();
      setProfileImage(imageUrl || 'https://via.placeholder.com/150');
      toast.success('Image updated successfully!');
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#16A085] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-4 py-2 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white rounded-lg hover:from-[#138871] hover:to-[#1a5f4f] transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#16A085] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Real Estate Background Image */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU1ZTUiPjwvcmVjdD4KPC9zdmc+')] opacity-30"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Section with Real Estate Background */}
          <div className="h-48 bg-gradient-to-r from-[#16A085] to-[#2C3E50] relative">
            {/* Beach House Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
            ></div>
            
            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiPjwvY2lyY2xlPgo8L3N2Zz4=')] opacity-20"></div>
            
            <div className="absolute -bottom-16 left-8">
              <div 
                className="relative group"
                onMouseEnter={() => setImageHover(true)}
                onMouseLeave={() => setImageHover(false)}
              >
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Upload Overlay */}
                <div className={`absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center transition-opacity duration-300 ${imageHover ? 'opacity-100' : 'opacity-0'}`}>
                  {uploading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <button 
                      onClick={() => document.getElementById('image-upload').click()}
                      className="text-white"
                      disabled={uploading}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  )}
                </div>
                
                <input 
                  id="image-upload"
                  type="file" 
                  className="hidden" 
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png"
                />
              </div>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-800">{userProfile?.name}</h1>
                <p className="text-gray-600">{userProfile?.email}</p>
                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    {userProfile?.role}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    Member since {new Date(userProfile?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white rounded-lg hover:from-[#138871] hover:to-[#1a5f4f] transition-all flex items-center justify-center shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            </div>
            
            {/* Profile Details */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-[#16A085]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="text-lg font-medium text-gray-800 mt-1">{userProfile?.name}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-[#16A085]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                      <p className="text-lg font-medium text-gray-800 mt-1">{userProfile?.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-[#16A085]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="text-lg font-medium text-gray-800 mt-1">
                        {userProfile?.phone || (
                          <span className="text-gray-500">Not provided</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-[#16A085]/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">Account Role</h3>
                      <p className="text-lg font-medium text-gray-800 mt-1">{userProfile?.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Account Activity</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-[#16A085]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="text-lg font-medium text-gray-800 mt-1">
                        {new Date(userProfile?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-[#16A085]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Last Login</p>
                      <p className="text-lg font-medium text-gray-800 mt-1">
                        {new Date(userProfile?.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-[#16A085]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#16A085]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Account Status</p>
                      <p className="text-lg font-medium text-gray-800 mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Real Estate Themed Section */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Property Preferences</h2>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                        alt="Luxury Villa" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Your Property Interests</h3>
                    <p className="text-gray-600 mb-4">
                      Based on your profile activity, we've noticed you're interested in luxury villas and beachfront properties. 
                      We'll notify you when new properties matching your preferences become available.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#16A085]/10 text-[#16A085] rounded-full text-sm">Luxury Villas</span>
                      <span className="px-3 py-1 bg-[#16A085]/10 text-[#16A085] rounded-full text-sm">Beachfront</span>
                      <span className="px-3 py-1 bg-[#16A085]/10 text-[#16A085] rounded-full text-sm">Modern Architecture</span>
                      <span className="px-3 py-1 bg-[#16A085]/10 text-[#16A085] rounded-full text-sm">Swimming Pool</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <ProfileUpdateForm 
                initialValues={userProfile} 
                onSubmit={handleSubmit} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;