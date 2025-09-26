// src/utils/validationSchemas.js
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be 10 digits').max(10, 'Phone number must be 10 digits'),
  role: Yup.string().required('Role is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

// Simple schema for agent registration without any conditional validation
export const agentSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  phone: Yup.string().required('Phone number is required').min(10, 'Phone number must be 10 digits').max(10, 'Phone number must be 10 digits'),
  role: Yup.string().required('Role is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  otp: Yup.string().required('Required'),
  newPassword: Yup.string().min(8).max(20).matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/, 'Must contain digit, uppercase, lowercase, special char').required('Required'),
});

export const profileUpdateSchema = Yup.object().shape({
  name: Yup.string().max(100),
  email: Yup.string().email(),
  phone: Yup.string().matches(/^\\+?[0-9]{10,15}$/, 'Invalid phone'),
});

export const propertySchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  price: Yup.number().positive('Positive').required('Required'),
  bedrooms: Yup.number().min(0),
  bathrooms: Yup.number().min(0),
  area: Yup.number().min(0),
  // images validation in form
});

export const reviewCreateSchema = Yup.object().shape({
  userId: Yup.number().required('Required'),
  propertyId: Yup.number().required('Required'),
  rating: Yup.number().min(1).max(5).required('Required'),
  comment: Yup.string().max(500),
  title: Yup.string().max(100),
});

export const reviewUpdateSchema = Yup.object().shape({
  rating: Yup.number().min(1).max(5),
  comment: Yup.string().max(500),
});

export const appointmentRequestSchema = Yup.object().shape({
  buyerId: Yup.number().required('Required'),
  propertyId: Yup.number().required('Required'),
  preferredTimes: Yup.array().min(1, 'At least one time').required('Required'),
  paymentToken: Yup.string().required('Required'),
});

export const appointmentActionSchema = Yup.object().shape({
  reason: Yup.string(),
  alternativeSlots: Yup.array().max(5),
});

export const messageSchema = Yup.object().shape({
  content: Yup.string().required('Required'),
});