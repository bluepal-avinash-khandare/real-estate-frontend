import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/common/CustomButton';
import { initiatePayment } from '../../services/paymentService';

const schema = Yup.object().shape({
  userId: Yup.number().required('Required'),
  amount: Yup.number().positive('Positive').required('Required'),
  gateway: Yup.string().required('Required'),
});

const InitiatePayment = () => {
  const handleSubmit = async (values) => {
    try {
      await initiatePayment(values);
      alert('Payment initiated');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={{ userId: '', amount: 0, gateway: '' }} validationSchema={schema} onSubmit={handleSubmit}>
      <Form>
        <Field name="userId" type="number" placeholder="User ID" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="userId" component="div" className="text-red-500" />
        <Field name="amount" type="number" placeholder="Amount" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="amount" component="div" className="text-red-500" />
        <Field name="gateway" placeholder="Gateway" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="gateway" component="div" className="text-red-500" />
        <CustomButton type="submit">Initiate</CustomButton>
      </Form>
    </Formik>
  );
};

export default InitiatePayment;