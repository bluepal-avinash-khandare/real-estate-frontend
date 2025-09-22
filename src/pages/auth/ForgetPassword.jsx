import React from 'react';
import ForgotPasswordForm from '../../components/forms/ForgetPasswordForm';
import { forgotPassword } from '../../services/authService';

const ForgotPassword = () => {
  const handleSubmit = async (values) => {
    try {
      await forgotPassword(values);
      alert('OTP sent');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ForgotPassword;