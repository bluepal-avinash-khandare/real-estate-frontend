import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfileUpdateForm from '../../components/forms/ProfileUpdateForm';
import { getUserById, updateUser } from '../../services/userService';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check if id is present and valid
    if (!id || id === 'undefined') {
      toast.error('Invalid user ID');
      navigate('/users');
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getUserById(id);
        setInitialValues(response.data);
      } catch (error) {
        toast.error('Failed to fetch user data');
        console.error('Error fetching user:', error);
        // Redirect to users list if user not found
        if (error.response?.status === 404) {
          navigate('/users');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (values) => {
    try {
      // Validate id before submitting
      if (!id || id === 'undefined') {
        throw new Error('Invalid user ID');
      }
      
      setSubmitting(true);
      
      // Create an object with only the changed fields
      const changedValues = {};
      Object.keys(values).forEach(key => {
        if (values[key] !== initialValues[key]) {
          changedValues[key] = values[key];
        }
      });
      
      // If no fields have changed, show a message and return
      if (Object.keys(changedValues).length === 0) {
        toast.info('No changes detected');
        return;
      }
      
      await updateUser(id, changedValues);
      toast.success('User updated successfully');
      // Redirect to user profile or list after successful update
      navigate(`/users/${id}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update user';
      toast.error(errorMessage);
      console.error('Error updating user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#16A085]"></div>
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] p-6">
            <h1 className="text-2xl font-bold text-white">Update User</h1>
            <p className="text-gray-200">Edit user information below</p>
          </div>
          <div className="p-6">
            <ProfileUpdateForm 
              initialValues={initialValues} 
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;