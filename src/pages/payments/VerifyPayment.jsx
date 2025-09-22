import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/common/CustomButton';
import { verifyPayment } from '../../services/paymentService';

const schema = Yup.object().shape({
  paymentToken: Yup.string().required('Required'),
});

const VerifyPayment = () => {
  const handleSubmit = async (values) => {
    try {
      await verifyPayment(values);
      alert('Payment verified');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik initialValues={{ paymentToken: '' }} validationSchema={schema} onSubmit={handleSubmit}>
      <Form>
        <Field name="paymentToken" placeholder="Payment Token" className="border p-2 mb-2 w-full" />
        <ErrorMessage name="paymentToken" component="div" className="text-red-500" />
        <CustomButton type="submit">Verify</CustomButton>
      </Form>
    </Formik>
  );
};

export default VerifyPayment;