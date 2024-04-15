import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  petal: {
    cursor: 'pointer',
    '&:hover': {
      fillOpacity: 0.7,
    },
  },
  petalText: props => ({
    fill: '#000',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontSize: `${props.fontSize}px`,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    pointerEvents: 'none',
  }),
});

const Petal = ({ size, label, angle, color, index, radius, onClick }) => {
  const fontSize = useMemo(() => Math.max(12, radius * 0.05), [radius]); // Dynamically adjust font size based on radius
  const styles = useStyles({ fontSize }); // Pass dynamic fontSize to useStyles

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

  const labelLines = label.split(/\s+/); // Split the label by spaces

  return (
    <g onClick={() => onClick(index)}>
      <path d={arcGenerator()} fill={color} className={styles.petal} />
      <text
        transform={`translate(${labelX}, ${labelY - labelLines.length * 10 + fontSize / 2})`} // Adjust Y position based on number of lines and font size
        className={styles.petalText}
      >
        {labelLines.map((line, i) => (
          <tspan key={i} x={0} dy={i === 0 ? '0' : '1.2em'}>{line}</tspan>
        ))}
      </text>
    </g>
  );
};

export default Petal;
