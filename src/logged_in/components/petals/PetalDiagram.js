import React, { useState, useEffect } from 'react';
import Petal from './Petal';
import Bubble from './Bubble';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Legend from './Legend';
import petalData from './petalData';
import Summary from './Summary';

// Inline styles for PetalDiagram container
const petalDiagramContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  gap: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
};

const PetalDiagram = ({ userData }) => {
  const bubbleRadius = 55; // Define a default radius for the bubbles
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    radius: 0,
    bubbleOffset: 0,
  });
  const [selectedPetal, setSelectedPetal] = useState(null);
  
    const calculateViewBox = () => {
    // Calculate the maximum bubble position extents
    const maxBubbleOffset = Math.max(...petalData.flatMap(petal => petal.bubbles.map(bubble => Math.abs(bubble.position.x))));
    const maxBubbleRadius = bubbleRadius * 2; // Since bubbles can extend to both sides
    const viewBoxWidth = width + maxBubbleOffset + maxBubbleRadius;
    const viewBoxHeight = height + maxBubbleRadius; // Assuming vertical extent is covered by height
    const minX = -(viewBoxWidth / 2);
    const minY = -(viewBoxHeight / 2);

    return `${minX} ${minY} ${viewBoxWidth} ${viewBoxHeight}`;
  };

  // Ensure the sizes are set properly before the first render
  useEffect(() => {
    const updateSize = () => {
      const sizeFactor = window.innerWidth < 600 ? 0.8 : 0.5;
      const newWidth = Math.min(500, window.innerWidth * sizeFactor);
      const newHeight = Math.min(500, window.innerHeight * sizeFactor);
      
      // Calculate additional height based on the bubble size and count
      const additionalHeight = petalData.reduce((acc, petal) => {
        return Math.max(acc, petal.bubbles.length * (bubbleRadius * 2 + 10));
      }, 0);

      const minHeight = newHeight + additionalHeight; // Ensure enough space for bubbles

      setDimensions(prevDimensions => ({
        width: newWidth,
        height: minHeight,
        radius: Math.min(newWidth, newHeight) / 3,
        bubbleOffset: newWidth / 10,
      }));
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []); // Empty dependencies array ensures this runs once on mount and cleanup runs on unmount

  const { width, height, radius, bubbleOffset } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;

  const viewBox = `0 0 ${width} ${height}`;
  const handlePetalClick = (index) => {
    const petal = petalData[index];
    const yOffset = 130; // Set a fixed vertical offset below the petals for the bubbles
    const bubbleSpacing = 130; // Set space between the bubbles horizontally
  
    // Find the lowest number within the bubbles for this petal
    const lowestNumber = Math.min(...petal.bubbles.map(bubble => bubble.number));
  
    const bubblePositions = petal.bubbles.map((bubble, i) => {
      const xPosition = 0 - ((petal.bubbles.length - 1) * bubbleSpacing) / 2 + i * bubbleSpacing;
      const yPosition = 0 + radius + yOffset; // Set a fixed yPosition for all bubbles
  
      return {
        x: xPosition,
        y: yPosition,
        isLowest: bubble.number === lowestNumber
      };
    });
  
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

  const bubbles = selectedPetal ? selectedPetal.bubbles.map((bubble, index) => (
    <Bubble
      key={index}
      name={bubble.name}
      number={bubble.number}
      position={bubble.position}
      isLowest={bubble.isLowest}
      courseLinks={bubble.courseLinks}
    />
  )) : null;

  return (
    <div style={petalDiagramContainerStyle}>
      <div style={{ textAlign: 'center', paddingTop: '10px' }}>
        <h1 style={{ fontSize: '32px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', margin: '20px 0 20px 0' }}>
          Results of the Assessment
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flexGrow: selectedPetal ? 0.5 : 1, display: 'flex', justifyContent: 'center', padding: '0 10px' }}>
            <svg
              width={width}
              height={height}
              viewBox={viewBox}
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
    </div>
  );
};

export default PetalDiagram;
