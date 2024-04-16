import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import useStyles from '../styles/useStyles';

const Tab = ({ title, active, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = useStyles();

  return (
    <div
      className={`${styles.tab} ${active ? styles.activeTab : ''}`}
      onClick={onClick}
      style={{
        padding: isMobile ? '7px 12px' : '12px 18px', // Smaller padding on mobile
        fontSize: isMobile ? '14px' : '18px', // Smaller font size on mobile
        cursor: 'pointer',
        margin: isMobile ? '5px' : '10px', // Smaller margin on mobile
        minWidth: isMobile ? '50px' : '100px', // Ensure tabs are easier to tap on mobile
      }}
    >
      {title}
    </div>
  );
};

export default Tab;
