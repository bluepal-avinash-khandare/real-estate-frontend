// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { messageSchema } from '../../utils/validationSchemas';
// import CustomButton from '../common/CustomButton';

// const MessageForm = ({ onSubmit }) => (
//   <Formik initialValues={{ content: '' }} validationSchema={messageSchema} onSubmit={onSubmit}>
//     <Form>
//       <Field name="content" placeholder="Message" className="border p-2 mb-2 w-full" />
//       <ErrorMessage name="content" component="div" className="text-red-500" />
//       <CustomButton type="submit">Send</CustomButton>
//     </Form>
//   </Formik>
// );

// export default MessageForm;


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { messageSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const MessageForm = ({ onSubmit }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="mx-auto flex justify-center">
          <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Send a Message</h2>
        <p className="mt-2 text-gray-600">
          Enter your message below and we'll get back to you as soon as possible.
        </p>
      </div>

      {/* Form Section */}
      <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10">
        <Formik initialValues={{ content: '' }} validationSchema={messageSchema} onSubmit={onSubmit}>
          {() => (
            <Form className="space-y-6">
              {/* Message Field */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <div className="mt-1">
                  <Field
                    id="content"
                    name="content"
                    as="textarea"
                    rows={4}
                    placeholder="Type your message here..."
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors resize-none"
                  />
                </div>
                <ErrorMessage name="content" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Submit Button */}
              <div>
                <CustomButton
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
                >
                  Send Message
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Additional Information */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Need immediate assistance?{' '}
          <a href="#" className="font-medium text-[#16A085] hover:text-[#138871]">
            Contact Support
          </a>
        </p>
      </div>

      {/* Response Time Note */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              We typically respond to messages within 24 hours during business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MessageForm;