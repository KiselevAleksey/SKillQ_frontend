import React from 'react';
import { makeStyles } from '@mui/styles';

// Use existing Bubble component and styles...

const useLegendStyles = makeStyles({
    legend: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '10px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      backgroundColor: '#f0f0f0', // Light grey background for the legend
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px',
    },
    legendColor: {
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      marginRight: '5px',
    },
    legendText: {
      fontSize: '14px',
      color: '#505050', // Dark grey text
    },
  });

const Legend = () => {
  const styles = useLegendStyles();
  return (
    <div className={styles.legend}>
      <div className={styles.legendItem}>
        <div className={`${styles.legendColor}`} style={{ background: 'rgba(255, 85, 85, 0.6)' }} />
        <span className={styles.legendText}>Lowest result</span>
      </div>
      <div className={styles.legendItem}>
        <div className={`${styles.legendColor}`} style={{ background: 'rgba(0, 200, 83, 0.6)' }} />
        <span className={styles.legendText}>Highest result</span>
      </div>
    </div>
  );
};

export default Legend;
