import React from 'react';
import AppointmentRequestForm from '../../components/forms/AppointmentRequestForm';
import { requestAppointment } from '../../services/appointmentService';

const RequestAppointment = () => {
  const handleSubmit = async (values) => {
    try {
      await requestAppointment(values);
      alert('Appointment requested');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AppointmentRequestForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RequestAppointment;