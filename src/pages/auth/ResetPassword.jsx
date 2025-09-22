import React from 'react';
import ResetPasswordForm from '../../components/forms/ResetPasswordForm';
import { resetPassword } from '../../services/authService';

const ResetPassword = () => {
  const handleSubmit = async (values) => {
    try {
      await resetPassword(values);
      alert('Password reset');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <ResetPasswordForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ResetPassword;