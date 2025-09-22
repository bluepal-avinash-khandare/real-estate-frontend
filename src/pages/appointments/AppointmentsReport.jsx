import React, { useContext } from 'react';
import CustomButton from '../../components/common/CustomButton';
import { AuthContext } from '../../contexts/AuthContext';
import { generateAppointmentsReport } from '../../services/appointmentService';

const AppointmentsReport = () => {
  const { user } = useContext(AuthContext);

  const handleGenerate = async () => {
    try {
      const blob = await generateAppointmentsReport(user.id);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      a.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CustomButton onClick={handleGenerate}>Generate Report</CustomButton>
    </div>
  );
};

export default AppointmentsReport;