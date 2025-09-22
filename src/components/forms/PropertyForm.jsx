import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { propertySchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const PropertyForm = ({ initialValues, onSubmit }) => (
  <Formik initialValues={initialValues} validationSchema={propertySchema} onSubmit={onSubmit}>
    {({ setFieldValue }) => (
      <Form>
        <Field name="title" placeholder="Title" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="title" component="div" className="text-red-500" />
        <Field name="description" placeholder="Description" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="description" component="div" className="text-red-500" />
        <Field name="address" placeholder="Address" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="address" component="div" className="text-red-500" />
        <Field name="price" type="number" placeholder="Price" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="price" component="div" className="text-red-500" />
        <Field name="bedrooms" type="number" placeholder="Bedrooms" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="bedrooms" component="div" className="text-red-500" />
        <Field name="bathrooms" type="number" placeholder="Bathrooms" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="bathrooms" component="div" className="text-red-500" />
        <Field name="area" type="number" placeholder="Area" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="area" component="div" className="text-red-500" />
        <input type="file" multiple onChange={(e) => setFieldValue('images', Array.from(e.target.files))} />
        <CustomButton type="submit">Submit</CustomButton>
      </Form>
    )}
  </Formik>
);

export default PropertyForm;