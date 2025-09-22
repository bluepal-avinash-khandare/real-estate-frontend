import React from 'react';
import { TextField } from '@mui/material';

const Filter = ({ onChange, placeholder }) => (
  <TextField
    label={placeholder}
    variant="outlined"
    onChange={onChange}
    className="mb-4"
  />
);

export default Filter;