import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const RegisterForm = ({ onSubmit }) => (
  <Formik 
    initialValues={{ 
      name: '', 
      email: '', 
      password: '', 
      role: 'CUSTOMER' // Set default role to CUSTOMER
    }} 
    validationSchema={registerSchema} 
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
            />
          </div>
          <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V16a3 3 0 11-6 0 3 3 0 016 0v1.5m-6-9.5h12" />
              </svg>
            </div>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
            />
          </div>
          <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
            />
          </div>
          <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-[#16A085] focus:ring-[#16A085] border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-[#16A085] hover:text-[#2C3E50] transition-colors">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#16A085] hover:text-[#2C3E50] transition-colors">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <CustomButton
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#1abc9c] hover:to-[#34495e] text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all duration-300"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </CustomButton>
        </div>
      </Form>
    )}
  </Formik>
);

export default RegisterForm;