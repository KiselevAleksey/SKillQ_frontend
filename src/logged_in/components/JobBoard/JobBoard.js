import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

import JobSidebar from './JobSidebar';
import JobListing from './JobListing';

const JobBoard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Responsive styles
  const jobBoardContainerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    padding: isMobile ? '20px' : '40px 20px',
    gap: isMobile ? '20px' : '30px',
    backgroundColor: '#f8f8f8',
    minHeight: '100%',
  };

  const jobBoardStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    maxWidth: '1200px',
    width: '100%',
    gap: '20px',
    boxSizing: 'border-box',
    marginTop: isMobile ? '40px' : '80px',
  };

  return (
    <div style={jobBoardContainerStyle}>
      <div style={jobBoardStyle}>
        {!isMobile && <JobSidebar />}
        <JobListing />
      </div>
    </div>
  );
};

export default JobBoard;
