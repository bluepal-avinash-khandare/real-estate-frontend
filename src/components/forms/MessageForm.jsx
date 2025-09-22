import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { messageSchema } from '../../utils/validationSchemas';
import CustomButton from '../common/CustomButton';

const MessageForm = ({ onSubmit }) => (
  <Formik initialValues={{ content: '' }} validationSchema={messageSchema} onSubmit={onSubmit}>
    <Form>
      <Field name="content" placeholder="Message" className="border p-2 mb-2 w-full" />
      <ErrorMessage name="content" component="div" className="text-red-500" />
      <CustomButton type="submit">Send</CustomButton>
    </Form>
  </Formik>
);

export default MessageForm;