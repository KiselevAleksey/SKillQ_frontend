import React, { useState } from 'react';
import { Card, CardContent, Typography, Chip, Box, CardActionArea, useTheme, useMediaQuery } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import JobDetails from './JobDetails'; // Make sure this import path is correct

const JobCard = ({ job }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Styles
  const styles = {
    card: (hover) => ({
      mb: isMobile ? 1 : 3,
      mt: isMobile ? 1 : 3,
      borderRadius: 2,
      boxShadow: hover ? 5 : 3,
      minWidth: '320px',
      maxWidth: '100%',
      mx: 'auto',
      transition: 'box-shadow 0.3s',
      backgroundColor: hover ? '#f0f8ff' : '#fff',
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

  // Toggle the display of JobDetails
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <Card 
        variant="outlined" 
        sx={styles.card(isHovered)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleDetails}
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
            </Box>
            {job.matched ? (
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleIcon color="success" fontSize="small" />
                  Your skill level matches this job
                </Typography>
              ) : (
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleIcon sx={{ color: 'orange' }} fontSize="small" />
                  Your skills are nearly in line with the job requirements
                </Typography>
              )}
          </CardContent>
        </CardActionArea>
      </Card>
      {showDetails && <JobDetails jobId={job.id} />}
    </>
  );
};

export default JobCard;
