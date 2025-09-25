// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { profileUpdateSchema } from '../../utils/validationSchemas';
// import CustomButton from '../common/CustomButton';

// const ProfileUpdateForm = ({ initialValues, onSubmit }) => (
//   <Formik initialValues={initialValues} validationSchema={profileUpdateSchema} onSubmit={onSubmit}>
//     <Form>
//       <Field name="name" placeholder="Name" className="border p-2 mb-2 w-full" />
//       <ErrorMessage name="name" component="div" className="text-red-500" />
//       <Field name="email" type="email" placeholder="Email" className="border p-2 mb-2 w-full" />
//       <ErrorMessage name="email" component="div" className="text-red-500" />
//       <Field name="phone" placeholder="Phone" className="border p-2 mb-2 w-full" />
//       <ErrorMessage name="phone" component="div" className="text-red-500" />
//       <CustomButton type="submit">Update</CustomButton>
//     </Form>
//   </Formik>
// );

// export default ProfileUpdateForm;


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profileUpdateSchema } from '../../validation/profileUpdateSchema'; // Import from existing file
import CustomButton from '../common/CustomButton';

const ProfileUpdateForm = ({ initialValues, onSubmit }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="mx-auto flex justify-center">
          <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Update Profile</h2>
        <p className="mt-2 text-gray-600">
          Keep your information up to date to ensure we can provide you with the best service.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
        <Formik initialValues={initialValues} validationSchema={profileUpdateSchema} onSubmit={onSubmit}>
          {() => (
            <Form className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                </div>
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
              </div>

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

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <Field
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                </div>
                <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Submit Button */}
              <div>
                <CustomButton
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
                >
                  Update Profile
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Additional Information */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Need to change your password?{' '}
          <a href="#" className="font-medium text-[#16A085] hover:text-[#138871]">
            Reset Password
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
              Your personal information is encrypted and securely stored. We never share your data with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileUpdateForm;