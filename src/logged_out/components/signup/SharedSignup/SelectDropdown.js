import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MaterialUISelectDropdown = ({ label, name, options, value, onChange }) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MaterialUISelectDropdown;

