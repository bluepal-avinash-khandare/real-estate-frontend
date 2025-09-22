import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/common/CustomButton';
import { startChatThread } from '../../services/messageService';

const schema = Yup.object().shape({
  leadId: Yup.number().required('Required'),
});

const StartChat = () => {
  const handleSubmit = async (values) => {
    try {
      await startChatThread(values.leadId);
      alert('Chat started');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={{ leadId: '' }} validationSchema={schema} onSubmit={handleSubmit}>
      <Form>
        <Field name="leadId" type="number" placeholder="Lead ID" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="leadId" component="div" className="text-red-500" />
        <CustomButton type="submit">Start</CustomButton>
      </Form>
    </Formik>
  );
};

export default StartChat;