import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../common/CustomButton';

const schema = Yup.object().shape({
  content: Yup.string()
    .required('Message content is required')
    .min(1, 'Message must be at least 1 character')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

const MessageForm = ({ onSubmit, initialValues = { content: '' }, isSubmitting = false }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {() => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows="4"
              placeholder="Type your message here..."
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#16A085] focus:border-[#16A085] transition-colors resize-none"
            />
            <ErrorMessage name="content" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          <div className="flex justify-end">
            <CustomButton
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-[#16A085] to-[#2C3E50] text-white rounded-lg hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-[#16A085] transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                  Send Message
                </span>
              )}
            </CustomButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;