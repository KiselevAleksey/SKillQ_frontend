// src/components/JobBoard/JobDetails.js
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import JobDetailsData from './JobDetailsData'; // Ensure this path is correct

const JobDetails = ({ jobId }) => {
  const job = JobDetailsData[jobId];
  const [isExpanded, setIsExpanded] = useState(false);

  if (!job) {
    return null; // If no job details found, don't render anything
  }

  // Toggle job description expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={{ maxWidth: '600px', margin: '20px', flexGrow: 1 }}>
      <CardContent>
        <Typography variant="h5" component="h2" sx={{ marginBottom: '16px' }}>
          {job.title}
        </Typography>
        
        {/* Company and location */}
        <Typography variant="subtitle1" sx={{ marginBottom: '8px' }}>
          {job.company} · {job.location}
        </Typography>

        {/* Other job details */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <Chip label={job.employmentType} size="small" />
          <Chip label={job.level} size="small" />
          <Chip label={`${job.companySize} employees`} size="small" />
          <Chip label={job.industry} size="small" />
          {job.skills.map(skill => (
            <Chip key={skill} label={skill} size="small" />
          ))}
        </Box>

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
          <Button variant="contained" color="primary">Apply</Button>
          <Button variant="outlined" color="primary">Save</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobDetails;
