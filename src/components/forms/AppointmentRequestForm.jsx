import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { appointmentRequestSchema } from '../../utils/validationSchemas';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomButton from '../common/CustomButton';
import { getToday } from '../../utils/helpers';

const AppointmentRequestForm = ({ onSubmit }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Formik initialValues={{ buyerId: '', propertyId: '', preferredTimes: [], paymentToken: '' }} validationSchema={appointmentRequestSchema} onSubmit={onSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <Field name="buyerId" type="number" placeholder="Buyer ID" className="border p-2 mb-2 w-full" />
          <ErrorMessage name="buyerId" component="div" className="text-red-500" />
          <Field name="propertyId" type="number" placeholder="Property ID" className="border p-2 mb-2 w-full" />
          <ErrorMessage name="propertyId" component="div" className="text-red-500" />
          <div>
            <DateTimePicker
              label="Preferred Time"
              minDate={getToday()}
              onChange={(date) => setFieldValue('preferredTimes', [...values.preferredTimes, date])}
            />
          </div>
          <ErrorMessage name="preferredTimes" component="div" className="text-red-500" />
          <Field name="paymentToken" placeholder="Payment Token" className="border p-2 mb-2 w-full" />
          <ErrorMessage name="paymentToken" component="div" className="text-red-500" />
          <CustomButton type="submit">Request</CustomButton>
        </Form>
      )}
    </Formik>
  </LocalizationProvider>
);

export default AppointmentRequestForm;