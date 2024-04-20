import React, { useState } from 'react';
import JobCard from './JobCard'; // Make sure the path to JobCard.js is correct
import JobFilters from './JobFilters'; // make sure the path is correct

// You can replace this mock data with actual job data fetched from an API
const jobsData = [
    {
        id: 2,
        title: 'SMM Strategist',
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
        skills: ['SMM', 'Content Marketing'],
      },
      {
        id: 4,
        title: 'Product Marketing Lead',
        company: 'Jones and Sons',
        location: 'Malaysia (Kuala Lumpur)',
        matched: false,
        promoted: true,
        easyApply: false,
        skills: ['Product Marketing', 'Content Marketing'],
      },
      {
        id: 5,
        title: 'Marketing Manager',
        company: 'Lee PLC',
        location: 'Malaysia (Kuala Lumpur)',
        matched: false,
        promoted: false,
        easyApply: true,
        skills: ['Content Marketing', 'Product Marketing', 'SMM'],
      },
      {
        id: 6,
        title: 'Product Marketing Lead',
        company: 'Hernandez-Brown',
        location: 'Malaysia (Kuala Lumpur)',
        matched: false,
        promoted: false,
        easyApply: true,
        skills: ['SMM', 'Product Marketing', 'Content Marketing'],
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