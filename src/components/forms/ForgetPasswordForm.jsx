import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { forgotPasswordSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const ForgotPasswordForm = ({ onSubmit }) => (
  <Formik initialValues={{ email: '' }} validationSchema={forgotPasswordSchema} onSubmit={onSubmit}>
    {() => (
      <Form className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
            />
          </div>
          <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Submit Button */}
        <div>
          <CustomButton
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
          >
            Send OTP
          </CustomButton>
        </div>
      </Form>
    )}
  </Formik>
);

export default ForgotPasswordForm;