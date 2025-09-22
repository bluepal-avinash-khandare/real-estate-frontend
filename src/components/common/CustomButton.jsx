import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ children, ...props }) => (
  <Button variant="contained" color="secondary" {...props} sx={{ textTransform: 'uppercase' }}>
    {children}
  </Button>
);

export default CustomButton;