import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';

const AddRemoveCategories = ({ skillDetails, selectedSkills, setSelectedSkills }) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');

  const handleToggle = (skill) => {
    const currentIndex = selectedSkills.indexOf(skill);
    const newChecked = [...selectedSkills];

    if (currentIndex === -1) {
      newChecked.push(skill);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedSkills(newChecked.sort((a, b) => Object.keys(skillDetails).indexOf(a) - Object.keys(skillDetails).indexOf(b)));
  };

  const filteredSkills = Object.keys(skillDetails)
    .filter(skill => skillDetails[skill].title.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => selectedSkills.includes(b) - selectedSkills.includes(a));

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)} style={{ color: '#FFFFFF', borderColor: '#b3294e' }}>
        Add or Remove Category
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ style: { maxHeight: '80vh' } }}>
        <DialogTitle>
          Select Categories
          <input
            type="text"
            placeholder="Search categories..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          />
        </DialogTitle>
        <DialogContent style={{ overflowY: 'auto' }}>
          <List style={{ maxHeight: '60vh', overflow: 'auto' }}>
            {filteredSkills.map((skill) => (
              <ListItem
                key={skill}
                button
                onClick={() => handleToggle(skill)}
                style={{
                  backgroundColor: selectedSkills.includes(skill) ? '#f7dbe7' : undefined,
                  fontWeight: selectedSkills.includes(skill) ? 'bold' : undefined,
                }}
              >
                <ListItemText primary={skillDetails[skill].title} />
                {selectedSkills.includes(skill) ? '✓' : ''}
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddRemoveCategories;
