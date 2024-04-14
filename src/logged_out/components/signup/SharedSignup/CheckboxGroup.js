import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Custom styles
const useStyles = makeStyles((theme) => ({
  formControlLabel: {
    marginBottom: theme.spacing(2), // Increase spacing between options
  },
}));

const CheckboxGroup = ({ label, options, selectedOptions, onChange }) => {
  const classes = useStyles();

  const handleCheckboxChange = (optionValue) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((option) => option !== optionValue)
      : [...selectedOptions, optionValue];
    onChange(newSelectedOptions);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                name={option.value}
              />
            }
            label={option.label}
            className={classes.formControlLabel}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGroup;

