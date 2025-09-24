import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileUpdateForm from '../../components/forms/ProfileUpdateForm';
import { updateUser, getUserProfileImage, getUserProfile, uploadProfileImage } from '../../services/userService';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateUser: updateAuthUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const profileData = await getUserProfile();
        setUserProfile(profileData);
        
        try {
          const imageUrl = await getUserProfileImage(); // No user.id
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
      toast.success('Profile updated');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('No file selected');
      return;
    }
    try {
      setUploading(true);
      await uploadProfileImage(file); // No user.id
      const imageUrl = await getUserProfileImage(); // Fetch updated URL
      setProfileImage(imageUrl || 'https://via.placeholder.com/150');
      toast.success('Image updated');
    } catch (error) {
      console.error('Upload failed:', error.response?.data || error.message);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] h-48 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative group">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <button 
                  onClick={() => document.getElementById('image-upload').click()}
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={uploading}
                >
                  {uploading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
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
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userProfile?.name}</h1>
                <p className="text-gray-600">{userProfile?.email}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {userProfile?.role}
                </span>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 bg-[#16A085] text-white rounded-lg hover:bg-[#138875] transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            </div>
            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{userProfile?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userProfile?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{userProfile?.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{userProfile?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Edit Profile</h3>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
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