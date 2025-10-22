
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { propertySchema } from "../../utils/validationSchemas";
import CustomButton from "../common/CustomButton";

const PropertyForm = ({ initialValues, onSubmit }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [documentPreviews, setDocumentPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      documentPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews, documentPreviews]);

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setFieldValue("images", files);

    // Create image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleDocumentChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setFieldValue("documents", files);

    // Create document previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setDocumentPreviews(previews);
  };

  const removeImage = (index, setFieldValue) => {
    URL.revokeObjectURL(imagePreviews[index]);
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);

    const newImages = [...(setFieldValue?.values?.images || [])];
    newImages.splice(index, 1);
    setFieldValue("images", newImages);
  };

  const removeDocument = (index, setFieldValue) => {
    URL.revokeObjectURL(documentPreviews[index]);
    const newPreviews = [...documentPreviews];
    newPreviews.splice(index, 1);
    setDocumentPreviews(newPreviews);

    const newDocuments = [...(setFieldValue?.values?.documents || [])];
    newDocuments.splice(index, 1);
    setFieldValue("documents", newDocuments);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    setShowSuccess(false);
    try {
      await onSubmit(values);
      resetForm();

      // Clean up previews
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
      documentPreviews.forEach((preview) => URL.revokeObjectURL(preview));
      setImagePreviews([]);
      setDocumentPreviews([]);

      // Show success message
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to create property. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Property Details</h1>
        <p className="mt-1 text-gray-600">
          Fill in the information to list your property
        </p>
      </div>

      {/* Success Message - Centered Button */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="https://img.icons8.com/fluency/96/checkmark.png"
                  alt="Success"
                  className="h-16 w-16"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Success!
              </h3>
              <p className="text-gray-600 mb-6">
                Your property has been created successfully.
              </p>
              <CustomButton
                onClick={() => setShowSuccess(false)}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
              >
                Property created successfully!
              </CustomButton>
            </div>
          </div>
        </div>
      )}

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
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Property Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter property title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Address Field */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <Field
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Enter property address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
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
                <ErrorMessage
                  name="description"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
               {/* Price Field */}


<div>
  <label
    htmlFor="price"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Price (₹)
  </label>
  <div className="relative rounded-md">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span className="text-gray-500 sm:text-sm">₹</span>
    </div>
    <Field name="price">
      {({ field, form }) => (
        <input
          {...field}
          id="price"
          type="number"
          min="0"
          step="0.01"
          placeholder=""  // 👈 empty by default (no 0.00)
          className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
          onChange={(e) => {
            let value = e.target.value;

            // Prevent negative numbers
            if (value < 0) {
              value = "";
            }

            // Remove leading zeros like 00023 → 23
            if (value.length > 1 && value[0] === "0" && !value.includes(".")) {
              value = value.replace(/^0+/, "");
            }

            form.setFieldValue("price", value);
          }}
        />
      )}
    </Field>
  </div>
  <ErrorMessage
    name="price"
    component="div"
    className="mt-1 text-sm text-red-600"
  />
</div>


                {/* Area Field */}
<div>
  <label
    htmlFor="area"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Area (sq ft)
  </label>
  <Field name="area">
    {({ field, form }) => (
      <input
        {...field}
        id="area"
        type="number"
        min="0"
        placeholder=""
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
        onChange={(e) => {
          let value = e.target.value;

          // Prevent negative numbers
          if (value < 0) value = "";

          // Remove leading zeros (e.g., 00045 -> 45)
          if (value.length > 1 && value[0] === "0" && !value.includes(".")) {
            value = value.replace(/^0+/, "");
          }

          form.setFieldValue("area", value);
        }}
      />
    )}
  </Field>
  <ErrorMessage
    name="area"
    component="div"
    className="mt-1 text-sm text-red-600"
  />
</div>


                {/* Bedrooms Field */}
<div>
  <label
    htmlFor="bedrooms"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Bedrooms
  </label>
  <Field name="bedrooms">
    {({ field, form }) => (
      <input
        {...field}
        id="bedrooms"
        type="number"
        min="0"
        placeholder=""
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
        onChange={(e) => {
          let value = e.target.value;

          // Prevent negative numbers
          if (value < 0) value = "";

          // Remove leading zeros (00045 → 45)
          if (value.length > 1 && value[0] === "0" && !value.includes(".")) {
            value = value.replace(/^0+/, "");
          }

          form.setFieldValue("bedrooms", value);
        }}
      />
    )}
  </Field>
  <ErrorMessage
    name="bedrooms"
    component="div"
    className="mt-1 text-sm text-red-600"
  />
</div>

{/* Bathrooms Field */}
<div>
  <label
    htmlFor="bathrooms"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Bathrooms
  </label>
  <Field name="bathrooms">
    {({ field, form }) => (
      <input
        {...field}
        id="bathrooms"
        type="number"
        min="0"
        placeholder=""
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
        onChange={(e) => {
          let value = e.target.value;

          // Prevent negative numbers
          if (value < 0) value = "";

          // Remove leading zeros (00045 → 45)
          if (value.length > 1 && value[0] === "0" && !value.includes(".")) {
            value = value.replace(/^0+/, "");
          }

          form.setFieldValue("bathrooms", value);
        }}
      />
    )}
  </Field>
  <ErrorMessage
    name="bathrooms"
    component="div"
    className="mt-1 text-sm text-red-600"
  />
</div>


                {/* Balcony Field */}
                <div>
                  <label
                    htmlFor="balcony"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Balconies
                  </label>
                  <Field
                    id="balcony"
                    name="balcony"
                    type="number"
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                  <ErrorMessage
                    name="balcony"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
                {/* amenities */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Swimming Pool",
                      "Gym",
                      "Parking",
                      "Garden",
                      "Lift",
                      "Security",
                    ].map((amenity) => (
                      <label key={amenity} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="amenities"
                          value={amenity}
                          checked={values.amenities?.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFieldValue("amenities", [
                                ...(values.amenities || []),
                                amenity,
                              ]);
                            } else {
                              setFieldValue(
                                "amenities",
                                values.amenities.filter((a) => a !== amenity)
                              );
                            }
                          }}
                          className="form-checkbox h-4 w-4 text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Floor Field */}
                <div>
                  <label
                    htmlFor="floor"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Floor
                  </label>
                  <Field
                    id="floor"
                    name="floor"
                    type="number"
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                  <ErrorMessage
                    name="floor"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Offer Percentage Field */}
                <div>
                  <label
                    htmlFor="offerPercentage"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Offer Percentage (%)
                  </label>
                  <Field
                    id="offerPercentage"
                    name="offerPercentage"
                    type="number"
                    placeholder="0"
                    min="0"
                    max="80"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                  <ErrorMessage
                    name="offerPercentage"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              </div>

              {/* Nearby Field */}
              <div>
                <label
                  htmlFor="nearby"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nearby Places
                </label>
                <Field
                  id="nearby"
                  name="nearby"
                  type="text"
                  placeholder="Schools, hospitals, transport, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                />
                <ErrorMessage
                  name="nearby"
                  component="div"
                  className="mt-1 text-sm text-red-600"
                />
              </div>


              {/* Rented By Field - Only show if rented is true */}
              {values.rented && (
                <div>
                  <label
                    htmlFor="rentedBy"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Rented By (User ID)
                  </label>
                  <Field
                    id="rentedBy"
                    name="rentedBy"
                    type="number"
                    placeholder="Enter tenant user ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                  />
                  <ErrorMessage
                    name="rentedBy"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
              )}

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
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB each
                    </p>
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
                          onClick={() =>
                            removeImage(index, { setFieldValue, values })
                          }
                        >
                          <img
                            src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
                            alt="Delete"
                            className="h-3 w-3"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Document Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Documents
                </label>
                <div className="mt-1 flex justify-center px-6 pt-8 pb-10 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:border-[#16A085] transition-colors">
                  <div className="space-y-3 text-center">
                    <div className="flex justify-center">
                      <img
                        src="https://img.icons8.com/fluency/96/document.png"
                        alt="Upload"
                        className="h-12 w-12 text-gray-400"
                      />
                    </div>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="document-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#16A085] hover:text-[#2C3E50] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#16A085]"
                      >
                        <span>Upload documents</span>
                        <input
                          id="document-upload"
                          name="document-upload"
                          type="file"
                          multiple
                          accept="image/*,.pdf"
                          className="sr-only"
                          onChange={(e) =>
                            handleDocumentChange(e, setFieldValue)
                          }
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 10MB each
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Previews */}
              {documentPreviews.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Previews
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {documentPreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        {preview.endsWith(".pdf") ? (
                          <div className="h-24 w-full flex items-center justify-center bg-gray-100 rounded-lg">
                            <img
                              src="https://img.icons8.com/fluency/96/pdf.png"
                              alt="PDF"
                              className="h-12 w-12"
                            />
                          </div>
                        ) : (
                          <img
                            src={preview}
                            alt={`Document Preview ${index + 1}`}
                            className="h-24 w-full object-cover rounded-lg shadow-sm"
                          />
                        )}
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() =>
                            removeDocument(index, { setFieldValue, values })
                          }
                        >
                          <img
                            src="https://img.icons8.com/ios-glyphs/30/ffffff/delete-sign.png"
                            alt="Delete"
                            className="h-3 w-3"
                          />
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
                      <img
                        src="https://img.icons8.com/ios-filled/50/ffffff/spinner-frame-2.png"
                        alt="Loading"
                        className="animate-spin h-4 w-4 mr-2"
                      />
                      Creating...
                    </span>
                  ) : (
                    "Create Property"
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
