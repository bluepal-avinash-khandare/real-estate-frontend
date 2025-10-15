// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { resetPasswordSchema } from '../../utils/validationSchemas';
// import CustomButton from '../common/CustomButton';

// const ResetPasswordForm = ({ onSubmit }) => (
//   <Formik initialValues={{ email: '', otp: '', newPassword: '' }} validationSchema={resetPasswordSchema} onSubmit={onSubmit}>
//     <Form>
//       <Field name="email" type="email" placeholder="Email" className="border p-2 mb-2 w-full" />
//       <ErrorMessage name="email" component="div" className="text-red-500" />
//       <Field name="otp" placeholder="OTP" className="border p-2 mb-2 w-full" />
//       <ErrorMessage name="otp" component="div" className="text-red-500" />
//       <Field name="newPassword" type="password" placeholder="New Password" className="border p-2 mb-2 w-full" />
//       <ErrorMessage name="newPassword" component="div" className="text-red-500" />
//       <CustomButton type="submit">Reset</CustomButton>
//     </Form>
//   </Formik>
// );

// export default ResetPasswordForm;


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { resetPasswordSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const ResetPasswordForm = ({ onSubmit }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="mx-auto flex justify-center">
          <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset Password</h2>
        <p className="mt-2 text-gray-600">
          Enter your email, OTP, and new password to reset your account.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
        <Formik initialValues={{ email: '', otp: '', newPassword: '' }} validationSchema={resetPasswordSchema} onSubmit={onSubmit}>
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
      </div>

      {/* Additional Information */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Didn't receive the OTP?{' '}
          <a href="#" className="font-medium text-[#16A085] hover:text-[#138871]">
            Resend Code
          </a>
        </p>
      </div>

      {/* Security Requirements */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Your password must be at least 8 characters long and include a mix of letters, numbers, and special characters.
            </p>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              For your security, we recommend changing your password regularly and using a unique password for each account.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ResetPasswordForm;