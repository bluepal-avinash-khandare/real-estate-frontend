// src/components/forms/AgentRegisterForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

// Phone input handler to limit to 10 digits and only numbers
const handlePhoneChange = (e, formikHelpers) => {
  const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
  if (value.length <= 10) {
    formikHelpers.setFieldValue('phone', value);
  }
};

const AgentRegisterForm = ({ onSubmit }) => (
  <Formik 
    initialValues={{ 
      name: '', 
      email: '', 
      password: '', 
      phone: '', 
      role: 'AGENT',
      licenseNumber: '',
      agency: '',
      experience: '',
      terms: false
    }} 
    validationSchema={registerSchema}
    validateOnChange={true}
    validateOnBlur={true}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, setFieldValue, errors, touched }) => (
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
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors ${
                errors.name && touched.name 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300'
              }`}
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
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors ${
                errors.email && touched.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300'
              }`}
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
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors ${
                errors.password && touched.password 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300'
              }`}
            />
          </div>
          <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="pl-2 text-gray-400">+91</span>
            </div>
            <Field
              id="phone"
              name="phone"
              type="tel"
              placeholder="9876543210"
              maxLength="10"
              onChange={(e) => handlePhoneChange(e, { setFieldValue })}
              className={`block w-full pl-20 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors ${
                errors.phone && touched.phone 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300'
              }`}
            />
          </div>
          <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Agent-specific Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* License Number */}
          <div>
            <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
              License Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <Field
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                placeholder="AGT123456"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors ${
                  errors.licenseNumber && touched.licenseNumber 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300'
                }`}
              />
            </div>
            <ErrorMessage name="licenseNumber" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Agency */}
          <div>
            <label htmlFor="agency" className="block text-sm font-medium text-gray-700 mb-2">
              Agency Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <Field
                id="agency"
                name="agency"
                type="text"
                placeholder="ACR Real Estate"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors ${
                  errors.agency && touched.agency 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300'
                }`}
              />
            </div>
            <ErrorMessage name="agency" component="div" className="mt-1 text-sm text-red-600" />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <Field
              id="experience"
              name="experience"
              type="text"
              placeholder="e.g., 5 years"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16A085] focus:border-[#16A085] transition-colors ${
                errors.experience && touched.experience 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300'
              }`}
            />
          </div>
          <ErrorMessage name="experience" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <Field
              id="terms"
              name="terms"
              type="checkbox"
              className={`h-4 w-4 text-[#16A085] focus:ring-[#16A085] border rounded ${
                errors.terms && touched.terms ? 'border-red-300' : 'border-gray-300'
              }`}
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
          <ErrorMessage name="terms" component="div" className="mt-1 text-sm text-red-600" />
        </div>

        {/* Submit Button */}
        <div>
          <CustomButton
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#2C3E50] to-[#16A085] hover:from-[#34495e] hover:to-[#1abc9c] text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all duration-300"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Agent Account...
              </span>
            ) : (
              'Create Agent Account'
            )}
          </CustomButton>
        </div>
      </Form>
    )}
  </Formik>
);

export default AgentRegisterForm;