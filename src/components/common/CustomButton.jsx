// import React from 'react';
// import Button from '@mui/material/Button';

// const CustomButton = ({ children, ...props }) => (
//   <Button variant="contained" color="secondary" {...props} sx={{ textTransform: 'capitalize' }}>
//     {children}
//   </Button>
// );

// export default CustomButton;



import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ children, ...props }) => {
  // Ensure type is set to submit if not provided
  const buttonProps = {
    ...props,
    type: props.type || 'button',
    onClick: (e) => {
      if (props.type === 'submit') {
        e.preventDefault();
        const form = e.target.closest('form');
        if (form) {
          form.requestSubmit();
        }
      }
      if (props.onClick) {
        props.onClick(e);
      }
    }
  };

  return (
    <Button 
      variant="contained" 
      color="secondary" 
      {...buttonProps} 
      sx={{ textTransform: 'capitalize' }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;