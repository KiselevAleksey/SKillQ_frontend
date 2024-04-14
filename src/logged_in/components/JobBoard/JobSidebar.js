import React from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router for navigation

// Inline styles
const sidebarStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  minWidth: '250px',
  height: '100vh', // Example height, you can adjust as needed
  boxSizing: 'border-box', // Make sure padding doesn't affect width
  borderRight: '1px solid #ddd', // Border to separate from main content
};

const linkStyle = {
  textDecoration: 'none',
  color: '#000', // Text color for links
  padding: '10px 0', // Space out the links vertically
};

const activeLinkStyle = {
  ...linkStyle,
  fontWeight: 'bold',
  color: '#0073b1', // Highlight color for active link
};

const postJobButtonStyle = {
  backgroundColor: '#0073b1', // Button color
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '20px',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '20px 0',
  textAlign: 'center',
};

// The JobSidebar component
const JobSidebar = () => {
  return (
    <div style={sidebarStyle}>
      {/* Link to "Post a Job", styled as a button */}
      <Link to="/post-job" style={postJobButtonStyle}>
        Compare your skills with others
      </Link>
      {/* Navigation Links */}
      <Link to="/my-jobs" style={linkStyle} activeStyle={activeLinkStyle}>
        My jobs
      </Link>
      <Link to="/preferences" style={linkStyle} activeStyle={activeLinkStyle}>
        Preferences
      </Link>
      <Link to="/demonstrate-skills" style={linkStyle} activeStyle={activeLinkStyle}>
        Demonstrate skills
      </Link>
      {/* ... other links ... */}
    </div>
  );
};

export default JobSidebar;
