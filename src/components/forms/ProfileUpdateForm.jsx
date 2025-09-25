import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profileUpdateSchema } from '../../validation/profileUpdateSchema'; // Import from existing file
import CustomButton from '../common/CustomButton';

const ProfileUpdateForm = ({ initialValues, onSubmit }) => (
  <Formik 
    initialValues={initialValues} 
    validationSchema={profileUpdateSchema} 
    onSubmit={onSubmit}
  >
    <Form>
      <Field name="name" placeholder="Name" className="border p-2 mb-2 w-full" />
      <ErrorMessage name="name" component="div" className="text-red-500" />
      
      <Field name="email" type="email" placeholder="Email" className="border p-2 mb-2 w-full" />
      <ErrorMessage name="email" component="div" className="text-red-500" />
      
      <Field name="phone" placeholder="Phone" className="border p-2 mb-2 w-full" />
      <ErrorMessage name="phone" component="div" className="text-red-500" />
      
      <CustomButton type="submit">Update</CustomButton>
    </Form>
  </Formik>
);

export default ProfileUpdateForm;