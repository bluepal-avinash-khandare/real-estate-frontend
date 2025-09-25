// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { forgotPasswordSchema } from '../../utils/validationSchemas';
// import CustomButton from '../common/CustomButton';

// const ForgotPasswordForm = ({ onSubmit }) => (
//   <Formik initialValues={{ email: '' }} validationSchema={forgotPasswordSchema} onSubmit={onSubmit}>
//     <Form>
//       <Field name="email" type="email" placeholder="Email" className="border p-2 mb-2 w-full" />
//       <ErrorMessage name="email" component="div" className="text-red-500" />
//       <CustomButton type="submit">Send Otp</CustomButton>
//     </Form>
//   </Formik>
// );

// export default ForgotPasswordForm;


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { forgotPasswordSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const ForgotPasswordForm = ({ onSubmit }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="mx-auto flex justify-center">
          <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Forgot Password?</h2>
        <p className="mt-2 text-gray-600">
          Enter your email address and we'll send you a one-time password to reset your password.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
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
      </div>

      {/* Additional Information */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{' '}
          <a href="#" className="font-medium text-[#16A085] hover:text-[#138871]">
            Sign in
          </a>
        </p>
      </div>

      {/* Security Note */}
      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              For your security, the OTP will expire in 15 minutes. Please check your email and enter the code promptly.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ForgotPasswordForm;