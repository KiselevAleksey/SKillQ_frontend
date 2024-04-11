import React from 'react';
import { TextField } from '@mui/material';

const MaterialUIInputField = ({ label, type, name, value, placeholder, onChange }) => {
  return (
    <TextField
      label={label}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      variant="outlined"
      fullWidth
    />
  );
};

export default MaterialUIInputField;

  
