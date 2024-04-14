import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box, CardActionArea } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const JobCard = ({ job, onJobSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Abstracted styles
  const styles = {
    card: (isHovered) => ({
      mb: 3,
      mt: 3,
      borderRadius: 2,
      boxShadow: isHovered ? 5 : 3, // Adjust shadow if hovered
      minWidth: '320px',
      maxWidth: '100%',
      mx: 'auto',
      transition: 'box-shadow 0.3s', // Smooth transition for shadow
      backgroundColor: isHovered ? '#f0f8ff' : '#fff', // Slight blue background when hovered
    }),
    promotedChip: {
      ml: 1,
      fontWeight: 'bold',
    },
    jobTitle: {
      fontWeight: 'bold',
      flexGrow: 1,
    },
  };

  return (
    <Card 
      variant="outlined" 
      sx={styles.card(isHovered)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onJobSelect(job)}
    >
      <CardActionArea>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="h2" sx={styles.jobTitle}>
              {job.title}
            </Typography>
            {job.promoted && (
              <Chip 
                label="Promoted" 
                size="small" 
                color="primary" 
                sx={styles.promotedChip}
              />
            )}
          </Box>
          <Typography sx={{ mb: 1, color: 'text.secondary' }}>{job.company}</Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography sx={{ mr: 1, color: 'text.secondary' }}>
              {job.location}
            </Typography>
            <CheckCircleIcon color="action" fontSize="small" />
          </Box>
          {job.matched && (
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CheckCircleIcon color="success" fontSize="small" />
              Your profile matches this job
            </Typography>
          )}
          {job.easyApply && <Typography variant="body2">Easy Apply</Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobCard;
