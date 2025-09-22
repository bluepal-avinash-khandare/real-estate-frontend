import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { appointmentActionSchema } from '../../utils/validationSchemas';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomButton from '../common/CustomButton';
import { getToday } from '../../utils/helpers';

const AppointmentActionForm = ({ onSubmit }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Formik initialValues={{ reason: '', alternativeSlots: [] }} validationSchema={appointmentActionSchema} onSubmit={onSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          <Field name="reason" placeholder="Reason" className="border p-2 mb-2 w-full" />
          <ErrorMessage name="reason" component="div" className="text-red-500" />
          <div>
            <DateTimePicker
              label="Alternative Slot"
              minDate={getToday()}
              onChange={(date) => setFieldValue('alternativeSlots', [...values.alternativeSlots, date])}
            />
          </div>
          <ErrorMessage name="alternativeSlots" component="div" className="text-red-500" />
          <CustomButton type="submit">Submit Action</CustomButton>
        </Form>
      )}
    </Formik>
  </LocalizationProvider>
);

export default AppointmentActionForm;