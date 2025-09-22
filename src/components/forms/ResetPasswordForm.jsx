import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { resetPasswordSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const ResetPasswordForm = ({ onSubmit }) => (
  <Formik initialValues={{ email: '', otp: '', newPassword: '' }} validationSchema={resetPasswordSchema} onSubmit={onSubmit}>
    <Form>
      <Field name="email" type="email" placeholder="Email" className="border p-2 mb-2 w-full" />
      <ErrorMessage name="email" component="div" className="text-red-500" />
      <Field name="otp" placeholder="OTP" className="border p-2 mb-2 w-full" />
      <ErrorMessage name="otp" component="div" className="text-red-500" />
      <Field name="newPassword" type="password" placeholder="New Password" className="border p-2 mb-2 w-full" />
      <ErrorMessage name="newPassword" component="div" className="text-red-500" />
      <CustomButton type="submit">Reset</CustomButton>
    </Form>
  </Formik>
);

export default ResetPasswordForm;