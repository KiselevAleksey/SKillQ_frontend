import React, { useState } from 'react';
import Petal from './Petal';
import Bubble from './Bubble';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Legend from './Legend'
import petalData from './petalData';
import Summary from './Summary';


const PetalDiagram = ({ userData }) => {
  const width = 500;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;
  const [selectedPetal, setSelectedPetal] = useState(null);

  const handlePetalClick = (index) => {
    const petal = petalData[index];
    
    // Define the starting x and y positions for the first bubble
    const startX = centerX + 40 - petal.bubbles.length;
    const startY = centerY + 40 - petal.bubbles.length;
  
    // Define a horizontal offset for each subsequent bubble
    const xOffset = 150;
  
    // Find the lowest number in the current petal's bubbles
    const lowestNumber = Math.min(...petal.bubbles.map(bubble => bubble.number));
  
    // Set the position of each bubble and mark the bubble with the lowest number
    const bubblePositions = petal.bubbles.map((bubble, i) => {
      return {
        x: - xOffset + i * xOffset,
        y: startY,
        isLowest: bubble.number === lowestNumber
      };
    });
  
    setSelectedPetal({
      ...petal,
      bubbles: petal.bubbles.map((bubble, i) => ({
        ...bubble,
        position: bubblePositions[i],
        isLowest: bubblePositions[i].isLowest // Include the isLowest flag
      })),
    });
  
    console.log(`Bubble positions for petal ${index}:`, bubblePositions);
  };
  
  const petals = petalData.map((data, index) => {
    const angle = (index * 2 * Math.PI) / petalData.length; // Calculate the angle for each petal
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
  ? selectedPetal.bubbles.map((bubble, index) => {
      console.log(`Rendering bubble ${index} for selected petal:`, bubble);
      return (
        <Bubble
          key={index}
          name={bubble.name}
          number={bubble.number}
          position={bubble.position}
          isLowest={bubble.isLowest}
          courseLinks={bubble.courseLinks}
        />
      );
    })
  : null;


  const printImageCorners = () => {
    const imageX = -radius * 0.5;
    const imageY = -radius * 0.5;
    const imageWidth = radius;
    const imageHeight = radius;

    const topLeft = { x: centerX + imageX, y: centerY + imageY };
    const topRight = { x: centerX + imageX + imageWidth, y: centerY + imageY };
    const bottomLeft = { x: centerX + imageX, y: centerY + imageY + imageHeight };
    const bottomRight = { x: centerX + imageX + imageWidth, y: centerY + imageY + imageHeight };

    console.log('Image corners:', { topLeft, topRight, bottomLeft, bottomRight });
  };

  // Call this function to log corners when component mounts
  React.useEffect(() => {
    printImageCorners();
  }, []);


  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
      <div style={{ flexGrow: selectedPetal ? 0 : 1, display: 'flex', justifyContent: 'center' }}>
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
                <AccountCircleIcon
                  style={{ 
                    width: '100%', 
                    height: '100%' 
                  }}
                />
              </foreignObject>
            )}
            <clipPath id="circleView">
              <circle cx={0} cy={0} r={radius * 0.5} />
            </clipPath>
            {bubbles} {/* Render bubbles after the image */}
            <Legend />
          </g>
          {/* Adding text at the top */}
          <text
            x={centerX}
            y={20}
            textAnchor="middle"
            alignmentBaseline="central"
            fontSize="24px" // Adjust font size as needed
            fontFamily="'Roboto', 'Helvetica', 'Arial', sans-serif"
            fill="#333" // Adjust text color as needed
          >
            Results of the Assessment
          </text>
        </svg>
        </div>
      {selectedPetal && <Summary petal={selectedPetal} />}
    </div>
  );
  
};

export default PetalDiagram;
