import React, { useState } from 'react';
import Petal from './Petal';
import Bubble from './Bubble';

const PetalDiagram = ({ userData }) => {
  const width = 600;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;
  const [selectedPetal, setSelectedPetal] = useState(null);

  const petalData = [
    {
      label: 'Expertise',
      size: 4,
      color: 'rgba(255, 0, 0, 0.4)',
      bubbles: [
        { name: 'Metric 1', number: 10 },
        { name: 'Metric 2', number: 20 },
        { name: 'Metric 3', number: 30 },
      ],
    },
    {
      label: 'Presentation',
      size: 6,
      color: 'rgba(0, 255, 0, 0.4)',
      bubbles: [
        { name: 'Metric 4', number: 10 },
        { name: 'Metric 5', number: 20 },
        { name: 'Metric 6', number: 30 },
      ],
    },
    {
      label: 'Problem Solving',
      size: 8,
      color: 'rgba(0, 0, 255, 0.3)',
      bubbles: [
        { name: 'Metric 7', number: 10 },
        { name: 'Metric 8', number: 20 },
        { name: 'Metric 9', number: 30 },
      ],
    },
  ];

  const handlePetalClick = (index) => {
    const petal = petalData[index];
    const angle = (index * 2 * Math.PI) / petalData.length;
  
    // Calculate offset based on petal size
    const PER_CENT_OF_PETAL_RADIUS = 0.5; // Adjust as needed (0 to 1)
    const bubbleRadiusOffset = petal.size * PER_CENT_OF_PETAL_RADIUS;
    const totalRadius = radius * 0.8 + bubbleRadiusOffset;
  
    // Use the same angle for all bubbles
    const bubbleAngles = [angle, angle, angle];
  
    // Position the bubbles on petal's outer edge
    const bubblePositions = bubbleAngles.map(angleOffset => {
      return {
        x: centerX + totalRadius * Math.cos(angleOffset),
        y: centerY + totalRadius * Math.sin(angleOffset),
      };
    });
  
    setSelectedPetal({
      ...petal,
      bubbles: petal.bubbles.map((bubble, i) => ({
        ...bubble,
        position: bubblePositions[i],
      })),
    });
  
    console.log(`Petal ${index} angle:`, angle);
    console.log(`Bubble angles for petal ${index}:`, bubbleAngles);
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
        />
      );
    })
  : null;

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <g transform={`translate(${centerX}, ${centerY})`}>
            {petals}
            {bubbles}
            <image
              href={userData.photoUrl || 'default-avatar.png'}
              x={-radius * 0.5}
              y={-radius * 0.5}
              height={radius}
              width={radius}
              clipPath="url(#circleView)"
            />
            <clipPath id="circleView">
              <circle cx={0} cy={0} r={radius * 0.5} />
            </clipPath>
          </g>
        </svg>
      </div>
    );
};

export default PetalDiagram;
