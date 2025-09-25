// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { appointmentActionSchema } from '../../utils/validationSchemas';
// import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import CustomButton from '../common/CustomButton';
// import { getToday } from '../../utils/helpers';

// const AppointmentActionForm = ({ onSubmit }) => (
//   <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <Formik initialValues={{ reason: '', alternativeSlots: [] }} validationSchema={appointmentActionSchema} onSubmit={onSubmit}>
//       {({ values, setFieldValue }) => (
//         <Form>
//           <Field name="reason" placeholder="Reason" className="border p-2 mb-2 w-full" />
//           <ErrorMessage name="reason" component="div" className="text-red-500" />
//           <div>
//             <DateTimePicker
//               label="Alternative Slot"
//               minDate={getToday()}
//               onChange={(date) => setFieldValue('alternativeSlots', [...values.alternativeSlots, date])}
//             />
//           </div>
//           <ErrorMessage name="alternativeSlots" component="div" className="text-red-500" />
//           <CustomButton type="submit">Submit Action</CustomButton>
//         </Form>
//       )}
//     </Formik>
//   </LocalizationProvider>
// );

// export default AppointmentActionForm;

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { appointmentActionSchema } from '../../utils/validationSchemas';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomButton from '../common/CustomButton';
import { getToday } from '../../utils/helpers';

const AppointmentActionForm = ({ onSubmit }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Formik 
      initialValues={{ reason: '', alternativeSlots: [] }} 
      validationSchema={appointmentActionSchema} 
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="space-y-6">
          {/* Reason Field */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Action
            </label>
            <Field
              id="reason"
              name="reason" 
              as="textarea"
              rows={3}
              placeholder="Please provide a reason for your action..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
            />
            <ErrorMessage name="reason" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Alternative Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alternative Time Slots
            </label>
            <div className="space-y-3">
              <DateTimePicker
                label="Select date and time"
                minDate={getToday()}
                onChange={(date) => setFieldValue('alternativeSlots', [...values.alternativeSlots, date])}
                className="w-full"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors'
                  }
                }}
              />
              
              {/* Display selected slots */}
              {values.alternativeSlots.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected Time Slots:</p>
                  <div className="space-y-2">
                    {values.alternativeSlots.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                        <span className="text-sm text-gray-700">
                          {slot.toLocaleString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const newSlots = [...values.alternativeSlots];
                            newSlots.splice(index, 1);
                            setFieldValue('alternativeSlots', newSlots);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <ErrorMessage name="alternativeSlots" component="div" className="mt-1 text-sm text-red-600" />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <CustomButton
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
            >
              Submit Action
            </CustomButton>
          </div>
        </Form>
      )}
    </Formik>
  </LocalizationProvider>
);

export default AppointmentActionForm;