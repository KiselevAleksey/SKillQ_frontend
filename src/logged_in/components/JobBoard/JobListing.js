import React, { useState } from 'react';
import JobCard from './JobCard'; // Make sure the path to JobCard.js is correct
import JobFilters from './JobFilters'; // make sure the path is correct

// You can replace this mock data with actual job data fetched from an API
const jobsData = [
    {
        id: 2,
        title: 'Social Media Marketing Strategist',
        company: 'Garrett-Moore',
        location: 'Malaysia (Kuala Lumpur)',
        matched: true,
        promoted: false,
        easyApply: true,
        skills: ['Content Marketing'],
      },
      {
        id: 3,
        title: 'Brand Marketing Executive',
        company: 'Salazar, Vincent and Evans',
        location: 'Malaysia (Kuala Lumpur)',
        matched: false,
        promoted: false,
        easyApply: false,
        skills: ['Social Media Marketing', 'Content Marketing'],
      },
      {
        id: 4,
        title: 'Marketing Strategy Lead',
        company: 'Jones and Sons',
        location: 'Malaysia (Kuala Lumpur)',
        matched: false,
        promoted: true,
        easyApply: false,
        skills: ['Marketing Strategy', 'Content Marketing'],
      },
      {
        id: 5,
        title: 'Marketing Manager',
        company: 'Lee PLC',
        location: 'Malaysia (Kuala Lumpur)',
        matched: false,
        promoted: false,
        easyApply: true,
        skills: ['Content Marketing', 'Marketing Strategy', 'Social Media Marketing'],
      },
      {
        id: 6,
        title: 'Marketing Strategy Lead',
        company: 'Hernandez-Brown',
        location: 'Malaysia (Kuala Lumpur)',
        matched: false,
        promoted: false,
        easyApply: true,
        skills: ['Social Media Marketing', 'Marketing Strategy', 'Content Marketing'],
      },
];

  // Styles for the JobListing component
  const listingStyle = {
    marginTop: '20px',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  };


  const JobListing = () => {
    // Styles for the JobListing component
    const listingStyle = {
      marginTop: '20px',
    };
  
    const headerStyle = {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px',
    };
  
    return (
      <div style={listingStyle}>
        <JobFilters />
        <div style={headerStyle}>Top job picks for you</div>
        {jobsData.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    );
  };
  
  export default JobListing;