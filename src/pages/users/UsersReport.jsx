import React from 'react';
import CustomButton from '../../components/common/CustomButton';
import { generateUsersPdf } from '../../services/userService';

const UsersReport = () => {
  const handleGenerate = async () => {
    try {
      const blob = await generateUsersPdf();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users_report.pdf';
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

export default UsersReport;