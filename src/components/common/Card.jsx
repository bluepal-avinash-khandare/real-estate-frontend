// import React from 'react';
// import { Card as MUICard, CardContent, Typography } from '@mui/material';

// const Card = ({ title, description, children }) => (
//   <MUICard className="m-2">
//     <CardContent>
//       <Typography variant="h5">{title}</Typography>
//       <Typography>{description}</Typography>
//       {children}
//     </CardContent>
//   </MUICard>
// );

// export default Card;


import React from 'react';
import { Card as MUICard, CardContent, Typography, CardHeader, IconButton, CardActions, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';

// Styled components for enhanced visuals
const StyledCard = styled(MUICard)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #16A085, #2C3E50)',
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: '16px 24px',
  '& .MuiCardHeader-title': {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#2C3E50',
  },
  '& .MuiCardHeader-subheader': {
    fontSize: '0.875rem',
    color: '#7F8C8D',
    marginTop: '4px',
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '0 24px 24px',
  '&:last-child': {
    paddingBottom: '24px',
  },
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: '12px 24px',
  backgroundColor: '#F8F9FA',
  borderTop: '1px solid #E9ECEF',
}));

const Card = ({ 
  title, 
  description, 
  children, 
  actions, 
  icon, 
  avatar,
  subheader,
  action,
  ...props 
}) => {
  const theme = useTheme();

  return (
    <StyledCard {...props}>
      {/* Card Header */}
      {(title || subheader || avatar || action) && (
        <StyledCardHeader
          avatar={avatar}
          action={
            action || (
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={
            <Typography variant="h5" component="div">
              {title}
            </Typography>
          }
          subheader={
            subheader || (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )
          }
        />
      )}

      {/* Card Content */}
      {children && (
        <StyledCardContent>
          {children}
        </StyledCardContent>
      )}

      {/* Card Actions */}
      {actions && (
        <StyledCardActions>
          {actions}
        </StyledCardActions>
      )}

      {/* Optional icon overlay */}
      {icon && (
        <Box
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: 'rgba(0, 0, 0, 0.1)',
            fontSize: '3rem',
            zIndex: 0,
          }}
        >
          {icon}
        </Box>
      )}
    </StyledCard>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  actions: PropTypes.node,
  icon: PropTypes.node,
  avatar: PropTypes.node,
  subheader: PropTypes.node,
  action: PropTypes.node,
};

export default Card;