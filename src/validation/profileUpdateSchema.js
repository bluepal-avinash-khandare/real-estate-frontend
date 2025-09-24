import * as Yup from 'yup';

export const profileUpdateSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .required('Name is required'),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address (e.g., user@domain.com)'
    )
    .required('Email is required'),

  phone: Yup.string()
    .matches(
      /^[6-9][0-9]{9}$/,
      'Phone must be exactly 10 digits and start with 6, 7, 8, or 9 (e.g., 9876543210)'
    )
    .nullable()           // allow empty if you want to make phone optional
    .required('Phone is required'),
});
