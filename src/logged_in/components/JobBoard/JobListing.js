import React from 'react';
import JobCard from './JobCard'; // Make sure the path to JobCard.js is correct

// You can replace this mock data with actual job data fetched from an API
const jobsData = [
    {
        id: 2,
        title: 'SMM Strategist',
        company: 'Garrett-Moore',
        location: 'Malaysia (Abigailborough)',
        matched: true,
        promoted: false,
        easyApply: true,
        skills: ['Content Marketing'],
      },
      {
        id: 3,
        title: 'Brand Marketing Executive',
        company: 'Salazar, Vincent and Evans',
        location: 'Malaysia (Lake Justinview)',
        matched: false,
        promoted: false,
        easyApply: false,
        skills: ['SMM', 'Content Marketing'],
      },
      {
        id: 4,
        title: 'Product Marketing Lead',
        company: 'Jones and Sons',
        location: 'Malaysia (Hollandside)',
        matched: false,
        promoted: true,
        easyApply: false,
        skills: ['Product Marketing', 'Content Marketing'],
      },
      {
        id: 5,
        title: 'Marketing Manager',
        company: 'Lee PLC',
        location: 'Malaysia (New Ronniemouth)',
        matched: false,
        promoted: false,
        easyApply: true,
        skills: ['Content Marketing', 'Product Marketing', 'SMM'],
      },
      {
        id: 6,
        title: 'Product Marketing Lead',
        company: 'Hernandez-Brown',
        location: 'Malaysia (South Toddside)',
        matched: false,
        promoted: false,
        easyApply: true,
        skills: ['SMM', 'Product Marketing', 'Content Marketing'],
      },
];

// Inline styles
const listingStyle = {
  marginTop: '20px',
};

const headerStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '16px',
};

// The JobListing component
const JobListing = ({ onJobSelect }) => {
    const handleJobCardClick = (jobId) => {
        onJobSelect(jobId);
      };

  return (
    <div style={listingStyle}>
      <div style={headerStyle}>Top job picks for you</div>
      {jobsData.map((job) => (
        <JobCard key={job.id} job={job} onJobSelect={() => handleJobCardClick(job.id)} />
      ))}
    </div>
  );
};

export default JobListing;
