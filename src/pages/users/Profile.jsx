import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ProfileUpdateForm from '../../components/forms/ProfileUpdateForm';
import { updateUser } from '../../services/userService';

const Profile = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (values) => {
    try {
      await updateUser(user.id, values);
      alert('Profile updated');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ProfileUpdateForm initialValues={user} onSubmit={handleSubmit} />
    </div>
  );
};

export default Profile;