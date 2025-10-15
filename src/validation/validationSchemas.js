import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .required('Full name is required'),

  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address (e.g., user@domain.com). Emails like v@g.com or v@g.c are not allowed.'
    )
    .required('Email address is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must not exceed 20 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/,
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character'
    )
    .required('Password is required'),

  phone: Yup.string()
    .matches(/^[6-9][0-9]{9}$/, 'Phone number must be exactly 10 digits and start with 6, 7, 8, or 9 (e.g., 9876543210)')
    .required('Phone number is required'),

  // Optional: Uncomment if terms validation is needed
  // terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});