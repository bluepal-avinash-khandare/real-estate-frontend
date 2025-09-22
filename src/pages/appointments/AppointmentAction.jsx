import React from 'react';
import { useParams } from 'react-router-dom';
import AppointmentActionForm from '../../components/forms/AppointmentActionForm';
import { handleAppointmentAction } from '../../services/appointmentService';

const AppointmentAction = () => {
  const { id } = useParams();

  const handleSubmit = async (values) => {
    try {
      await handleAppointmentAction(id, 'ACCEPT', values); // Example action, adjust as needed
      alert('Action handled');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AppointmentActionForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AppointmentAction;