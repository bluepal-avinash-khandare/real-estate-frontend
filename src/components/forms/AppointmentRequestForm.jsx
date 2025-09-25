// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { appointmentRequestSchema } from '../../utils/validationSchemas';
// import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import CustomButton from '../common/CustomButton';
// import { getToday } from '../../utils/helpers';

// const AppointmentRequestForm = ({ onSubmit }) => (
//   <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <Formik initialValues={{ buyerId: '', propertyId: '', preferredTimes: [], paymentToken: '' }} validationSchema={appointmentRequestSchema} onSubmit={onSubmit}>
//       {({ values, setFieldValue }) => (
//         <Form>
//           <Field name="buyerId" type="number" placeholder="Buyer ID" className="border p-2 mb-2 w-full" />
//           <ErrorMessage name="buyerId" component="div" className="text-red-500" />
//           <Field name="propertyId" type="number" placeholder="Property ID" className="border p-2 mb-2 w-full" />
//           <ErrorMessage name="propertyId" component="div" className="text-red-500" />
//           <div>
//             <DateTimePicker
//               label="Preferred Time"
//               minDate={getToday()}
//               onChange={(date) => setFieldValue('preferredTimes', [...values.preferredTimes, date])}
//             />
//           </div>
//           <ErrorMessage name="preferredTimes" component="div" className="text-red-500" />
//           <Field name="paymentToken" placeholder="Payment Token" className="border p-2 mb-2 w-full" />
//           <ErrorMessage name="paymentToken" component="div" className="text-red-500" />
//           <CustomButton type="submit">Request</CustomButton>
//         </Form>
//       )}
//     </Formik>
//   </LocalizationProvider>
// );

// export default AppointmentRequestForm;


import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { appointmentRequestSchema } from '../../utils/validationSchemas';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomButton from '../common/CustomButton';
import { getToday } from '../../utils/helpers';

const AppointmentRequestForm = ({ onSubmit }) => (
  <div className="py-8">
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-gray-900">Schedule Appointment</h1>
      <p className="mt-1 text-gray-600">Fill in the details to request a property viewing</p>
    </div>

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik 
        initialValues={{ 
          buyerId: '', 
          propertyId: '', 
          preferredTimes: [], 
          paymentToken: '' 
        }} 
        validationSchema={appointmentRequestSchema} 
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Buyer ID Field */}
              <div>
                <label htmlFor="buyerId" className="block text-sm font-medium text-gray-700 mb-1">
                  Buyer ID
                </label>
                <Field 
                  id="buyerId"
                  name="buyerId" 
                  type="number" 
                  placeholder="Enter buyer ID" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                />
                <ErrorMessage name="buyerId" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              {/* Property ID Field */}
              <div>
                <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 mb-1">
                  Property ID
                </label>
                <Field 
                  id="propertyId"
                  name="propertyId" 
                  type="number" 
                  placeholder="Enter property ID" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
                />
                <ErrorMessage name="propertyId" component="div" className="mt-1 text-sm text-red-600" />
              </div>
            </div>

            {/* Preferred Time Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time
              </label>
              <div className="relative">
                <DateTimePicker
                  label="Select date and time"
                  minDate={getToday()}
                  onChange={(date) => setFieldValue('preferredTimes', [...values.preferredTimes, date])}
                  className="w-full"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      className: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors'
                    }
                  }}
                />
              </div>
              <ErrorMessage name="preferredTimes" component="div" className="mt-1 text-sm text-red-600" />
            </div>

            {/* Payment Token Field */}
            <div>
              <label htmlFor="paymentToken" className="block text-sm font-medium text-gray-700 mb-1">
                Payment Token
              </label>
              <Field 
                id="paymentToken"
                name="paymentToken" 
                type="text" 
                placeholder="Enter payment token" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#16A085] focus:border-[#16A085] transition-colors"
              />
              <ErrorMessage name="paymentToken" component="div" className="mt-1 text-sm text-red-600" />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <CustomButton
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#16A085] to-[#2C3E50] hover:from-[#138871] hover:to-[#1a5f4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16A085] transition-all"
              >
                Request Appointment
              </CustomButton>
            </div>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  </div>
);

export default AppointmentRequestForm;