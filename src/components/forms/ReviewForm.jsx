import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { reviewCreateSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const ReviewForm = ({ initialValues, onSubmit }) => (
  <Formik initialValues={initialValues} validationSchema={reviewCreateSchema} onSubmit={onSubmit}>
    {({ setFieldValue }) => (
      <Form>
        <Field name="userId" type="number" placeholder="User ID" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="userId" component="div" className="text-red-500" />
        <Field name="propertyId" type="number" placeholder="Property ID" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="propertyId" component="div" className="text-red-500" />
        <Field name="rating" type="number" placeholder="Rating" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="rating" component="div" className="text-red-500" />
        <Field name="comment" placeholder="Comment" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="comment" component="div" className="text-red-500" />
        <Field name="title" placeholder="Title" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="title" component="div" className="text-red-500" />
        <input type="file" multiple onChange={(e) => setFieldValue('files', Array.from(e.target.files))} />
        <CustomButton type="submit">Submit</CustomButton>
      </Form>
    )}
  </Formik>
);

export default ReviewForm;