import React, { useState } from 'react';
import {
  Box, TextField, IconButton, Menu, Autocomplete, FormControl, InputLabel,
  Select, MenuItem, OutlinedInput, Checkbox, ListItemText
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

// Dummy data for filters
const locations = ['New York', 'San Francisco', 'Berlin', 'Tokyo'];
const skills = ['JavaScript', 'Python', 'Project Management', 'Design'];
const seniorityLevels = ['Entry', 'Mid', 'Senior', 'Lead'];

const JobFilters = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSeniority, setSelectedSeniority] = useState('');

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ my: 2 }}>
      <TextField 
        fullWidth 
        placeholder="Search jobs" 
        variant="outlined" 
        sx={{ mb: 2 }}
      />
      <IconButton aria-label="filter list" onClick={handleOpen}>
        <FilterListIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        keepMounted
      >
        <FormControl sx={{ m: 2, width: 200 }}>
          <Autocomplete
            options={locations}
            value={selectedLocation}
            onChange={(event, newValue) => {
              setSelectedLocation(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
        </FormControl>
        <FormControl sx={{ m: 2, width: 200 }}>
          <Autocomplete
            multiple
            options={skills}
            value={selectedSkills}
            onChange={(event, newValue) => {
              setSelectedSkills(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Skills" placeholder="Add a skill" />
            )}
          />
        </FormControl>
        <FormControl sx={{ m: 2, width: 200 }}>
          <InputLabel>Role Seniority</InputLabel>
          <Select
            value={selectedSeniority}
            onChange={(event) => setSelectedSeniority(event.target.value)}
            input={<OutlinedInput label="Role Seniority" />}
          >
            {seniorityLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Menu>
    </Box>
  );
};

export default JobFilters;
