// CategorySelector.js
import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: '200px',
    minHeight: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));


const CategorySelector = ({ categories, onSubmit }) => {
    const classes = useStyles();
    const [selectedCategory, setSelectedCategory] = useState('');
  
    const handleChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    const handleSubmit = () => {
      console.log('Selected category:', selectedCategory);
      onSubmit(selectedCategory);
    };
  
    return (
      <div className={classes.container}>
        <Typography variant="h6" gutterBottom>
          Please choose the category to make an assessment on.
        </Typography>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="category"
            name="category"
            className={classes.group}
            value={selectedCategory}
            onChange={handleChange}
          >
            {categories.map((cat, index) => (
              <FormControlLabel
                key={index}
                value={cat}
                control={<Radio color="primary" />}
                label={cat}
              />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedCategory}
            className={classes.submitButton}
          >
            Submit
          </Button>
        </FormControl>
      </div>
    );
  };
  
  export default CategorySelector;