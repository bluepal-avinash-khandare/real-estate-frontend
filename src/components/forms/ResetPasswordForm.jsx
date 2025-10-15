import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { resetPasswordSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const ResetPasswordForm = ({ onSubmit, prefilledEmail = '' }) => (
  <Formik
    initialValues={{
      email: prefilledEmail, // Pre-fill if provided
      otp: '',
      newPassword: '',
    }}
    validationSchema={resetPasswordSchema}
    onSubmit={onSubmit}
  >
    {({ values }) => (
      <Form className="space-y-6">
        {/* Email Field (show note if pre-filled) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          {prefilledEmail && (
            <p className="text-xs text-gray-500 mb-1">Pre-filled from previous step</p>
          )}
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
              value={values.email} // Ensure it's controlled
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
            />
          </div>
          <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* OTP Field */}
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
            One-Time Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <Field
              id="otp"
              name="otp"
              type="text"
              placeholder="Enter OTP"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
            />
          </div>
          <ErrorMessage name="otp" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* New Password Field */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <Field
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="••••••••"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
            />
          </div>
          <ErrorMessage name="newPassword" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Submit Button */}
        <div>
          <CustomButton
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
          >
            Reset Password
          </CustomButton>
        </div>
      </Form>
    )}
  </Formik>
);

export default ResetPasswordForm;