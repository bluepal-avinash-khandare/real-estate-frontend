import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { forgotPasswordSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const ForgotPasswordForm = ({ onSubmit }) => (
  <Formik initialValues={{ email: '' }} validationSchema={forgotPasswordSchema} onSubmit={onSubmit}>
    <Form>
      <Field name="email" type="email" placeholder="Email" className="border p-2 mb-2 w-full" />
      <ErrorMessage name="email" component="div" className="text-red-500" />
      <CustomButton type="submit">Send Otp</CustomButton>
    </Form>
  </Formik>
);

export default ForgotPasswordForm;