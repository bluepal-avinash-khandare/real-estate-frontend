import React from 'react';
import { Card as MUICard, CardContent, Typography } from '@mui/material';

const Card = ({ title, description, children }) => (
  <MUICard className="m-2">
    <CardContent>
      <Typography variant="h5">{title}</Typography>
      <Typography>{description}</Typography>
      {children}
    </CardContent>
  </MUICard>
);

export default Card;