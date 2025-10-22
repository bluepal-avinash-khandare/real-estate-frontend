import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/common/CustomButton';
import { startChatThread } from '../../services/messageService';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  leadId: Yup.number().required('Lead ID is required').positive('Must be a positive number'),
});

const StartChat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const leadIdFromUrl = queryParams.get('leadId');

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await startChatThread(values.leadId);
      setSuccess(true);
      
      setTimeout(() => {
        navigate(`/agent/messages/${response.data}`);
      }, 2000);
    } catch (error) {
      console.error('Start chat error:', error);
      setError(error.response?.data?.message || 'Failed to start chat. Please check the Lead ID and try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (leadIdFromUrl) {
      handleSubmit({ leadId: parseInt(leadIdFromUrl) });
    }
  }, [leadIdFromUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto flex justify-center mb-4">
                <div className="bg-gradient-to-r from-[#16A085] to-[#2C3E50] p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Start New Chat</h1>
              <p className="text-gray-600">
                Initiate a conversation with a lead by entering their Lead ID
              </p>
            </div>

            {success ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Chat started successfully! Redirecting to messages...
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <Formik 
                initialValues={{ leadId: leadIdFromUrl || '' }} 
                validationSchema={schema} 
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form className="space-y-6">
                    <div>
                      <label htmlFor="leadId" className="block text-sm font-medium text-gray-700 mb-2">
                        Lead ID
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <Field
                          id="leadId"
                          name="leadId"
                          type="number"
                          placeholder="Enter Lead ID"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                          disabled={!!leadIdFromUrl || isLoading}
                        />
                      </div>
                      <ErrorMessage name="leadId" component="div" className="mt-1 text-sm text-red-600" />
                    </div>

                    <CustomButton
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Starting Chat...
                        </span>
                      ) : (
                        'Start Chat'
                      )}
                    </CustomButton>
                  </Form>
                )}
              </Formik>
            )}

            {error && (
              <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartChat;