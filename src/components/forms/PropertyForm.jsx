import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { propertySchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const PropertyForm = ({ initialValues, onSubmit }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setFieldValue('images', files);
    
    // Create image previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      resetForm();
      setImagePreviews([]);
      alert('Property created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create property. Please try again.');
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Property Details</h1>
        <p className="mt-1 text-gray-600">Fill in the information to list your property</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={propertySchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter property title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                />
                <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Address Field */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <Field
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter property address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                />
                <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  rows={3}
                  placeholder="Enter property description"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                />
                <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Price Field */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹)
                  </label>
                  <div className="relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₹</span>
                    </div>
                    <Field
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0.00"
                      className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                    />
                  </div>
                  <ErrorMessage name="price" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Area Field */}
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                    Area (sq ft)
                  </label>
                  <Field
                    id="area"
                    name="area"
                    type="number"
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                  <ErrorMessage name="area" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Bedrooms Field */}
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms
                  </label>
                  <Field
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                  <ErrorMessage name="bedrooms" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Bathrooms Field */}
                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms
                  </label>
                  <Field
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                  <ErrorMessage name="bathrooms" component="div" className="mt-1 text-sm text-red-600" />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Images
                </label>
                <div className="mt-1 flex justify-center px-6 pt-8 pb-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-[#16A085] transition-colors">
                  <div className="space-y-3 text-center">
                    <div className="flex justify-center">
                      <img 
                        src="https://img.icons8.com/fluency/96/image-gallery.png" 
                        alt="Upload" 
                        className="h-12 w-12 text-gray-400"
                      />
                    </div>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#16A085] hover:text-[#2C3E50] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#16A085]"
                      >
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleImageChange(e, setFieldValue)}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                </div>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Previews
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="h-24 w-full object-cover rounded-lg shadow-sm"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            const newPreviews = [...imagePreviews];
                            newPreviews.splice(index, 1);
                            setImagePreviews(newPreviews);
                            
                            const newImages = [...values.images];
                            newImages.splice(index, 1);
                            setFieldValue('images', newImages);
                          }}
                        >
                          <img src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png" alt="Delete" className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <CustomButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <img src="https://img.icons8.com/ios-filled/50/ffffff/spinner-frame-2.png" alt="Loading" className="animate-spin h-4 w-4 mr-2" />
                      Creating...
                    </span>
                  ) : (
                    'Create Property'
                  )}
                </CustomButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PropertyForm;