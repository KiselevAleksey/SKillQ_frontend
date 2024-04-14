import React from 'react';
import useStyles from '../styles/useStyles';

const Tab = ({ title, active, onClick }) => {
  const styles = useStyles();
  return (
    <div
      className={`${styles.tab} ${active ? styles.activeTab : ''}`}
      onClick={onClick} 
    >
      {title}
    </div>
  );
};

export default Tab;
