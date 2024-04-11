// Petal.js
import React from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  petal: {
    cursor: 'pointer',
    '&:hover': {
      fillOpacity: 0.7,
    },
  },
  petalText: {
    fill: '#000',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontSize: '14px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    pointerEvents: 'none',
  },
});

const Petal = ({ size, label, angle, color, index, radius, onClick }) => {
  const styles = useStyles();
  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.5 + size * 20)
    .startAngle(angle - 0.4)
    .endAngle(angle + Math.PI / 3 + 0.05);

  const textArcGenerator = d3.arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.5 + size * 20)
    .startAngle(angle - 0.4)
    .endAngle(angle + Math.PI / 3);

  const [labelX, labelY] = textArcGenerator.centroid();
  const rotation = (angle + angle + Math.PI / 3) / 2 * (180 / Math.PI);

  return (
    <g onClick={() => onClick(index)}>
      <path d={arcGenerator()} fill={color} className={styles.petal} />
      <text
        transform={`translate(${labelX}, ${labelY}) rotate(${rotation})`}
        className={styles.petalText}
      >
        {label}
      </text>
    </g>
  );
};

export default Petal;
