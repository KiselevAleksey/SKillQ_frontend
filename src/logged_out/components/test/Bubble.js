// Bubble.js
import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  bubble: {
    fill: '#fff',
    stroke: '#000',
    cursor: 'pointer',
  },
  bubbleText: {
    fill: '#000',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontSize: '12px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const Bubble = ({ name, number, position }) => {
  const styles = useStyles();
  return (
    <g transform={`translate(${position.x}, ${position.y})`}>
      <circle cx={0} cy={0} r={20} className={styles.bubble} />
      <text className={styles.bubbleText}>{name}</text>
      <text dy={15} className={styles.bubbleText}>{number}</text>
    </g>
  );
};

export default Bubble;
