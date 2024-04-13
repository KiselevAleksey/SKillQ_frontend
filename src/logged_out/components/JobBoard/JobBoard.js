// src/components/JobBoard/JobBoard.js
import React, { useState } from 'react';

import JobSidebar from './JobSidebar';
import JobListing from './JobListing';
import JobDetails from './JobDetails';

// Inline styles
const jobBoardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '40px 20px', // Adds more vertical padding, retains horizontal padding
  gap: '30px', // Adds space between sidebar and listing
  backgroundColor: '#f8f8f8', // Sets a background color for the entire job board area
  minHeight: '120vh', // Ensures that the job board takes up at least the full height of the viewport
};

const jobBoardStyle = {
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '1200px', // Set a max-width for the content area to center it
  width: '100%', // Use the full width within the padding of the container
  gap: '20px', // Adds space between the sidebar and the listing components
  boxSizing: 'border-box', // Ensures padding doesn't affect the width
  marginTop: '80px', // Adds margin around the entire JobBoard
};

const JobBoard = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleJobSelect = (jobId) => {
    setSelectedJobId(jobId); // Here we set the selected job ID
  };

  return (
    <div style={jobBoardContainerStyle}>
      <div style={jobBoardStyle}>
        <JobSidebar />
        <JobListing onJobSelect={handleJobSelect} />
        {selectedJobId && <JobDetails jobId={selectedJobId} />}
      </div>
    </div>
  );
};

export default JobBoard;
