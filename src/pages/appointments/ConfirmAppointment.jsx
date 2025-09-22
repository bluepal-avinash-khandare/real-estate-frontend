import React from 'react';
import { useParams } from 'react-router-dom';
import CustomButton from '../../components/common/CustomButton';
import { confirmAppointment } from '../../services/appointmentService';

const ConfirmAppointment = () => {
  const { id } = useParams();

  const handleConfirm = async () => {
    try {
      await confirmAppointment(id);
      alert('Confirmed');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CustomButton onClick={handleConfirm}>Confirm</CustomButton>
    </div>
  );
};

export default ConfirmAppointment;