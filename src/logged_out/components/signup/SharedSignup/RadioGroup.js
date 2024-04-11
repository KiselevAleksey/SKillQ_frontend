// RadioGroup.js
import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup as MuiRadioGroup, FormLabel } from '@mui/material';

const RadioGroup = ({ options, selectedOption, onChange, label }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <MuiRadioGroup name="role" value={selectedOption} onChange={(e) => onChange(e.target.value)}>
        {options.map((option, index) => (
          <FormControlLabel 
            key={index}
            value={option.value} 
            control={<Radio />} 
            label={option.label} 
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};

export default RadioGroup;
