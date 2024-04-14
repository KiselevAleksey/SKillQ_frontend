import React from 'react';
import { Button } from '@mui/material';

const MaterialUIButton = ({ children, onClick, type = 'button', className = '', variant = 'contained', color = 'primary' }) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      className={className}
      variant={variant}
      color={color}
    >
      {children}
    </Button>
  );
};

export default MaterialUIButton;
