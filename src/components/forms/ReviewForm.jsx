// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { reviewCreateSchema } from '../../utils/validationSchemas';
// import CustomButton from '../common/CustomButton';

// const ReviewForm = ({ initialValues, onSubmit }) => (
//   <Formik initialValues={initialValues} validationSchema={reviewCreateSchema} onSubmit={onSubmit}>
//     {({ setFieldValue }) => (
//       <Form>
//         <Field name="userId" type="number" placeholder="User ID" className="border p-2 mb-2 w-full" />
//         <ErrorMessage name="userId" component="div" className="text-red-500" />
//         <Field name="propertyId" type="number" placeholder="Property ID" className="border p-2 mb-2 w-full" />
//         <ErrorMessage name="propertyId" component="div" className="text-red-500" />
//         <Field name="rating" type="number" placeholder="Rating" className="border p-2 mb-2 w-full" />
//         <ErrorMessage name="rating" component="div" className="text-red-500" />
//         <Field name="comment" placeholder="Comment" className="border p-2 mb-2 w-full" />
//         <ErrorMessage name="comment" component="div" className="text-red-500" />
//         <Field name="title" placeholder="Title" className="border p-2 mb-2 w-full" />
//         <ErrorMessage name="title" component="div" className="text-red-500" />
//         <input type="file" multiple onChange={(e) => setFieldValue('files', Array.from(e.target.files))} />
//         <CustomButton type="submit">Submit</CustomButton>
//       </Form>
//     )}
//   </Formik>
// );

// export default ReviewForm;


import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { reviewCreateSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewForm = ({ initialValues, onSubmit, isSubmitting = false }) => {
  const [filePreviews, setFilePreviews] = useState([]);

  const handleFileChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setFieldValue('files', files);
    
    // Create image previews
    const previews = files.map(file => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return null;
    }).filter(Boolean);
    
    setFilePreviews(previews);
  };

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-3xl focus:outline-none transform transition-transform duration-200 hover:scale-110"
          >
            {star <= value ? (
              <span className="text-yellow-400 drop-shadow-md">★</span>
            ) : (
              <span className="text-gray-300">☆</span>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="mx-auto flex justify-center">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-full shadow-lg shadow-cyan-500/30 animate-pulse-slow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Share Your Experience
          </h2>
          <p className="mt-3 text-lg text-gray-300 max-w-md mx-auto">
            Your honest feedback helps our community make better decisions
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-gray-800/70 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-gray-700/50">
          <Formik initialValues={initialValues} validationSchema={reviewCreateSchema} onSubmit={onSubmit}>
            {({ setFieldValue, values }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* User ID Field */}
                  <div>
                    <label htmlFor="userId" className="block text-sm font-medium text-cyan-300 mb-1">
                      User ID
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <Field
                        id="userId"
                        name="userId"
                        type="number"
                        placeholder="Enter user ID"
                        className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition-colors"
                      />
                    </div>
                    <ErrorMessage name="userId" component="div" className="mt-1 text-sm text-red-400" />
                  </div>

                  {/* Property ID Field */}
                  <div>
                    <label htmlFor="propertyId" className="block text-sm font-medium text-cyan-300 mb-1">
                      Property ID
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                      </div>
                      <Field
                        id="propertyId"
                        name="propertyId"
                        type="number"
                        placeholder="Enter property ID"
                        className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition-colors"
                      />
                    </div>
                    <ErrorMessage name="propertyId" component="div" className="mt-1 text-sm text-red-400" />
                  </div>
                </div>

                {/* Rating Field */}
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-1">
                    Rating
                  </label>
                  <div className="mt-1">
                    <StarRating 
                      value={values.rating} 
                      onChange={(value) => setFieldValue('rating', value)} 
                    />
                  </div>
                  <ErrorMessage name="rating" component="div" className="mt-1 text-sm text-red-400" />
                </div>

                {/* Title Field */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-cyan-300 mb-1">
                    Review Title
                  </label>
                  <div className="mt-1">
                    <Field
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Summarize your experience"
                      className="block w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition-colors"
                    />
                  </div>
                  <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-400" />
                </div>

                {/* Comment Field */}
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-cyan-300 mb-1">
                    Your Review
                  </label>
                  <div className="mt-1">
                    <Field
                      id="comment"
                      name="comment"
                      as="textarea"
                      rows={4}
                      placeholder="Share details about your experience..."
                      className="block w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition-colors resize-none"
                    />
                  </div>
                  <ErrorMessage name="comment" component="div" className="mt-1 text-sm text-red-400" />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-1">
                    Upload Photos
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-600 rounded-lg bg-gray-900/30 hover:border-cyan-500 transition-colors">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-400">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => handleFileChange(e, setFieldValue)}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                    </div>
                  </div>
                </div>

                {/* Image Previews */}
                {filePreviews.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Photo Previews
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {filePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square overflow-hidden rounded-lg border border-gray-700 shadow-md">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <button
                            type="button"
                            className="absolute top-2 right-2 bg-red-500/80 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                            onClick={() => {
                              const newPreviews = [...filePreviews];
                              newPreviews.splice(index, 1);
                              setFilePreviews(newPreviews);
                              
                              const newFiles = [...values.files];
                              newFiles.splice(index, 1);
                              setFieldValue('files', newFiles);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <CustomButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : 'Submit Review'}
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Guidelines */}
        <div className="mt-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-300">
                Please be honest and constructive in your review. Reviews that violate our <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">community guidelines</a> will be removed.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default ReviewForm;