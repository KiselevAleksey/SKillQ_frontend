import React, { useState, useEffect, useLayoutEffect } from 'react';
import Petal from './Petal';
import Bubble from './Bubble';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Legend from './Legend';
import petalData from './petalData';
import Summary from './Summary';

const PetalDiagram = ({ userData }) => {
  // State for dimensions now holds more than just width and height
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    radius: 0, // Will be calculated
    bubbleOffset: 0, // Will be calculated
  });
  const [selectedPetal, setSelectedPetal] = useState(null);

  // Update dimensions based on window size
  useEffect(() => {
    const updateSize = () => {
      // Use a smaller fraction of width for smaller screens
      let sizeFactor = window.innerWidth < 600 ? 0.8 : 0.5;
      let newWidth = Math.min(500, window.innerWidth * sizeFactor);
      let newHeight = Math.min(500, window.innerHeight * sizeFactor);
      setDimensions({
        width: newWidth,
        height: newHeight,
        radius: Math.min(newWidth, newHeight) / 3,
        bubbleOffset: newWidth / 10,
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize(); // Initial size update
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const { width, height, radius, bubbleOffset } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;

  const handlePetalClick = (index) => {
    const petal = petalData[index];
    const startX = centerX + 40 - petal.bubbles.length;
    const startY = centerY + 40 - petal.bubbles.length;
    const xOffset = 150;
    const lowestNumber = Math.min(...petal.bubbles.map(bubble => bubble.number));
    const bubblePositions = petal.bubbles.map((bubble, i) => ({
      x: - xOffset + i * xOffset,
      y: startY,
      isLowest: bubble.number === lowestNumber
    }));
    setSelectedPetal({
      ...petal,
      bubbles: petal.bubbles.map((bubble, i) => ({
        ...bubble,
        position: bubblePositions[i],
        isLowest: bubblePositions[i].isLowest
      })),
    });
  };

  const petals = petalData.map((data, index) => {
    const angle = (index * 2 * Math.PI) / petalData.length;
    return (
      <Petal
        key={index}
        size={data.size}
        label={data.label}
        angle={angle}
        color={data.color}
        index={index}
        radius={radius}
        onClick={() => handlePetalClick(index)}
      />
    );
  });

  const bubbles = selectedPetal
  ? selectedPetal.bubbles.map((bubble, index) => (
      <Bubble
        key={index}
        name={bubble.name}
        number={bubble.number}
        position={bubble.position}
        isLowest={bubble.isLowest}
        courseLinks={bubble.courseLinks}
      />
    ))
  : null;

return (
  <div style={{ textAlign: 'center', paddingTop: '10px' }}>
    <h1 style={{ fontSize: '32px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', margin: '0 0 20px 0' }}>
      Results of the Assessment
    </h1>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ flexGrow: selectedPetal ? 0.5 : 1, display: 'flex', justifyContent: 'center', padding: '0 10px' }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          overflow="visible"
        >
          <g transform={`translate(${centerX}, ${centerY})`}>
            {petals}
            {userData.photoUrl ? (
              <image
                href={userData.photoUrl}
                x={-radius * 0.5}
                y={-radius * 0.5}
                height={radius}
                width={radius}
                clipPath="url(#circleView)"
              />
            ) : (
              <foreignObject x={-radius * 0.5} y={-radius * 0.5} width={radius} height={radius}>
                <AccountCircleIcon style={{ width: '100%', height: '100%' }} />
              </foreignObject>
            )}
            <clipPath id="circleView">
              <circle cx={0} cy={0} r={radius * 0.5} />
            </clipPath>
            {bubbles}
            <Legend />
          </g>
        </svg>
      </div>
      {selectedPetal && <Summary petal={selectedPetal} style={{ margin: '0 10px' }} />}
    </div>
  </div>
);
};


export default PetalDiagram;
