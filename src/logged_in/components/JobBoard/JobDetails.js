import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, useTheme, useMediaQuery, Dialog, DialogTitle} from '@mui/material';
import JobDetailsData from './JobDetailsData'; // Ensure this path is correct
import SkillChips from './SkillChips';

const JobDetails = ({ jobId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const job = JobDetailsData[jobId];
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  
  const userSkills = { //to be replaced with actual skills
    'Content Marketing': 82,
    'Product Marketing': 96,
    'SMM': 73,
    'Presentation': 66,
    'Problem Solving': 48,
  };

  if (!job) {
    return null; // If no job details found, don't render anything
  }

  // Toggle job description expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  
  // Handle Apply button click
  const handleApplyClick = () => {
    setOpenDialog(true); // Open the dialog
  };


  // Handle closing of the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Card sx={{ 
      maxWidth: isMobile ? '100%' : '600px', // full width on mobile
      margin: isMobile ? '10px' : '20px', // smaller margin on mobile
      flexGrow: 1,
      overflow: 'visible', // prevent clipping of elements like dropdowns
    }}>
      <CardContent>
        {/* Other job details */}
        <Typography variant="subtitle1" gutterBottom>
          Level: {job.level}
        </Typography>
        <SkillChips jobSkills={job.skills} userSkills={userSkills} />

        {/* Job description with toggle */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Typography 
            variant="body1" 
            sx={{ 
              display: '-webkit-box', 
              overflow: 'hidden', 
              WebkitBoxOrient: 'vertical', 
              WebkitLineClamp: isExpanded ? 'none' : 2,
              marginRight: '8px',
            }}
          >
            {job.description}
          </Typography>
          {!isExpanded && (
            <Button onClick={toggleExpand} sx={{ textTransform: 'none', padding: '0', minWidth: 'auto' }}>
              ...more
            </Button>
          )}
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button variant="contained" color="primary" onClick={handleApplyClick}>Apply</Button>
          <Button variant="outlined" color="primary">Save</Button>
        </Box>
      </CardContent>

      <Dialog open={openDialog} onClose={handleCloseDialog} sx={{ '& .MuiDialog-paper': { padding: theme.spacing(2), borderRadius: theme.shape.borderRadius } }}>
        <DialogTitle sx={{ textAlign: 'center' }}>Great job! Your profile CV is shared with the recruiter.</DialogTitle>
      </Dialog>
    </Card>
  );
};

export default JobDetails;
