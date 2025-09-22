import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfileUpdateForm from '../../components/forms/ProfileUpdateForm';
import { getUserById, updateUser } from '../../services/userService';

const UpdateUser = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(id);
      setInitialValues(data.data);
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await updateUser(id, values);
      alert('User updated');
    } catch (error) {
      console.error(error);
    }
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div>
      <ProfileUpdateForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateUser;